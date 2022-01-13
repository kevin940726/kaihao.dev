declare module 'remark-codesandbox' {
  declare function remarkCodeSandbox(options?: {
    mode?: 'meta' | 'iframe' | 'button';
    customTemplates?: Record<
      string,
      {
        extends?: string;
        entry?: string;
      }
    >;
    autoDeploy?: boolean;
  }): (tree: Root) => void;

  export default remarkCodeSandbox;
}
