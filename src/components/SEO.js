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
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:image" content={metaImage.src} />
      <meta name="og:image:width" content={metaImage.width} />
      <meta name="og:image:height" content={metaImage.height} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage.src} />
      {children}
    </Helmet>
  );
}

export default SEO;
