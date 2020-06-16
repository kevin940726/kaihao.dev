const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({
      node,
      getNode,
      basePath: 'src/posts',
      trailingSlash: false,
    });

    const postDir = path.basename(path.dirname(node.fileAbsolutePath));

    createNodeField({
      name: 'slug',
      node,
      value: `/posts${value}`,
    });

    createNodeField({
      name: 'postDir',
      node,
      value: postDir,
    });

    createNodeField({
      name: 'fileName',
      node,
      value: path.join(postDir, path.basename(node.fileAbsolutePath)),
    });
  }
};

exports.sourceNodes = ({ actions, getNode, getNodesByType, getNodes }) => {
  const { createNodeField } = actions;

  const allFile = getNodesByType('File');
  const allMdx = getNodesByType('Mdx');

  const FILE_EXTS = /\.(png|jpe?g|gif)/i;

  const metaImageMap = new Map();

  for (let file of allFile) {
    if (file.name === 'meta-image' && FILE_EXTS.test(file.ext)) {
      const imageSharp = getNode(file.children[0]);
      metaImageMap.set(file.relativeDirectory, imageSharp.id);
    }
  }

  for (let mdx of allMdx) {
    if (!mdx.frontmatter.image && metaImageMap.has(mdx.fields.postDir)) {
      createNodeField({
        node: getNode(mdx.id),
        name: 'image',
        value: metaImageMap.get(mdx.fields.postDir),
      });
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  // Create a post meta page only in development mode to capture screenshots
  if (process.env.NODE_ENV === 'development') {
    createPage({
      path: '/___post-meta',
      component: path.resolve(`./src/layouts/PostMetaLayout.js`),
    });
  }

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }
        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/layouts/PostLayout.js`),
            // We can use the values in this context in
            // our page layout component
            context: { id: node.id },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ entry, actions }) => {
  actions.setWebpackConfig({
    entry: {
      ...entry,
      'theme-mode': path.resolve(__dirname, './src/utils/themeMode.js'),
    },
  });
};
