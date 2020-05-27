import Head from "next/head"
import React, { Fragment } from "react"
import PropTypes from "prop-types"

const SEO = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />

      {props.description && (
        <Fragment>
          <meta name="description" content={props.description}/>
          <meta property="og:description" content={props.description} />
        </Fragment>
      )}

      {props.url && (
        <meta property="og:url" content={props.url} />
      )}

      <meta property="og:type" content={props.type || "website"} />

      <link rel="canonical" href="https://egressos.uffs.edu.br"/>
      <meta property="og:locale" content="pt_BR" />
    </Head>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
}

export default SEO
