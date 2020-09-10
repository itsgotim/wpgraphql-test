import React from "react"

import { Link } from "gatsby"
import { Box, Heading } from "@chakra-ui/core"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import { normalizePath } from "../../utils/get-url-path"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const TheAccordion = ({items}) => {
  let whatever = []
  for (let z = 0; z < items.accordion; z++) {
    whatever.push({'title': items[`accordion_${z}_accordion_title`], 'content': items[`accordion_${z}_accordion_content`]})
  }
  return (
    <Accordion>
      {whatever.map((item) => {
        return (
        <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>{item.title}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p dangerouslySetInnerHTML={{__html: item.content}} />
        </AccordionItemPanel>
      </AccordionItem>
        )
      })}
    </Accordion>
  )
}

function BlogPost({ data }) {
  const { nextPage, previousPage, page } = data
  const { title, content, featuredImage } = page

  return (
    <Layout>
      <Heading as="h1" size="xl" mb={5}>
        {title}
      </Heading>

      {!!featuredImage?.node?.remoteFile?.childImageSharp && (
        <Box mb={5}>
          <Img fluid={featuredImage.node.remoteFile.childImageSharp.fluid} />
        </Box>
      )}

      <div>
        {JSON.parse(data.page.blocksJSON).map((ablock,i) => {
          return (
            <React.Fragment>
              {ablock.name === 'acf/accordion' ? (
                <TheAccordion items={ablock.attributes.data} />
              ) : ( 
                <div dangerouslySetInnerHTML={{ __html: ablock.saveContent }} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      <br />
      {!!nextPage && (
        <Link to={normalizePath(nextPage.uri)}>Next: {nextPage.title}</Link>
      )}
      <br />
      {!!previousPage && (
        <Link to={normalizePath(previousPage.uri)}>
          Previous: {previousPage.title}
        </Link>
      )}
    </Layout>
  )
}

export default BlogPost
