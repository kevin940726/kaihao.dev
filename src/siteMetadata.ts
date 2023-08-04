export default {
  title: 'Kai Hao',
  description: "I'm Kai Hao, a front-end developer in Taiwan.",
  author: '@kevin940726',
  repo: 'https://github.com/kevin940726/kaihao.dev',
  origin:
    process.env.HOST ||
    (process.env.VERCEL_ENV !== 'production' &&
      `https://${process.env.VERCEL_URL}`) ||
    'https://kaihao.dev',
  siteUrl: 'https://kaihao.dev',
} as const;
