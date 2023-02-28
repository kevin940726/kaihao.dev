/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: false,
      },
      {
        source: '/blog/:slug*',
        destination: '/posts/:slug*',
        permanent: false,
      },
      {
        source: '/BeanfunLogin',
        destination: 'https://kevin940726.github.io/BeanfunLogin',
        permanent: true,
      },
      {
        source: '/minesweeper',
        destination: 'https://kevin940726.github.io/minesweeper',
        permanent: true,
      },
    ];
  },
};
