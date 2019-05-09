import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { globalHistory } from '@reach/router';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    file(relativePath: { eq: "default-meta-image.png" }) {
      childImageSharp {
        fixed(width: 1200, height: 626) {
          src
          width
          height
        }
      }
    }
  }
`;

function SEO({ title, description, image, lang = 'en', children }) {
  const data = useStaticQuery(detailsQuery);
  const metaDescription = description || data.site.siteMetadata.description;
  const metaImage = image || data.file.childImageSharp.fixed;

  const metaImageAbsolutePath = `${globalHistory.location.origin}${
    metaImage.src
  }`;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      defaultTitle={data.site.siteMetadata.title}
    >
      <title>{title}</title>
      <meta property="description" content={metaDescription} />
      <meta property="og:url" content={globalHistory.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImageAbsolutePath} />
      <meta property="og:image:width" content={metaImage.width} />
      <meta property="og:image:height" content={metaImage.height} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:creator"
        content={data.site.siteMetadata.author}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImageAbsolutePath} />
      {children}
    </Helmet>
  );
}

export default SEO;
