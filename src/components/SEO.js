import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        origin
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
  const { origin } = data.site.siteMetadata;

  const metaImageAbsolutePath = `${origin}${metaImage.src}`;

  return (
    <Location>
      {({ location }) => (
        <Helmet
          htmlAttributes={{ lang }}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
        >
          <title>{title}</title>
          <meta name="description" content={metaDescription} />
          <meta property="og:url" content={`${origin}${location.pathname}`} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={metaImageAbsolutePath} />
          <meta property="og:image:width" content={metaImage.width} />
          <meta property="og:image:height" content={metaImage.height} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:creator"
            content={data.site.siteMetadata.author}
          />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={metaImageAbsolutePath} />
          {children}
        </Helmet>
      )}
    </Location>
  );
}

export default SEO;
