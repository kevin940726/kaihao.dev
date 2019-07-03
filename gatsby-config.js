const pkg = require('./package.json');

const isAuditing = process.env.BUILD_ENV === 'audit';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mapping: {
    'Mdx.fields.image': 'ImageSharp',
  },
  siteMetadata: {
    title: pkg.title,
    description: pkg.description,
    author: pkg.author,
    repo: pkg.repository.url,
    origin: isProd ? 'https://kaihao.dev' : 'http://localhost:8000',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // Add a collection called "posts" that looks
    // for files in content/posts/
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 760,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kai Hao',
        short_name: `kaihao`,
        start_url: `/`,
        background_color: `#f2994a`,
        theme_color: `#f2994a`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Open Sans',
            variants: ['400'],
          },
        ],
        fontDisplay: 'swap',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-netlify',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-75983216-5',
        respectDNT: true,
      },
    },
    isAuditing && {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        defaultSizes: 'gzip',
      },
    },
  ].filter(Boolean),
};
