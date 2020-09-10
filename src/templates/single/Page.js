import React from "react"
import { graphql } from "gatsby"
import BlogPost from "../../components/template-parts/blog-post"


export default ({ data }) => {
  return <BlogPost data={data} />
}

export const query = graphql`
  query page($id: String!, $nextPage: String, $previousPage: String) {
    page: wpPage(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          remoteFile {
            ...HeroImage
          }
        }
      }
      blocks {
        ... on WpAcfAccordionBlock {
          attributes {
            data
          }
        }
      }
      blocksJSON
    }

    nextPage: wpPage(id: { eq: $nextPage }) {
      title
      uri
    }

    previousPage: wpPage(id: { eq: $previousPage }) {
      title
      uri
    }
  }
`
