import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    file(relativePath: { eq: "profile.jpeg" }) {
      childImageSharp {
        fixed(width: 600, height: 600) {
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

  return (
    <Helmet
      htmlAttributes={{ lang }}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      defaultTitle={data.site.siteMetadata.title}
    >
      <title>{title}</title>
      <meta property="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage.src} />
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
      <meta property="twitter:image" content={metaImage.src} />
      {children}
    </Helmet>
  );
}

export default SEO;
