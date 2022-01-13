declare module 'mdx/types' {
  export type MDXComponents = import('mdx/types').MDXComponents & {
    [key: string]: any;
  };
}
