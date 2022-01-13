declare module 'prismjs/components' {
  declare function loadLanguages(): void;
  declare namespace loadLanguages {
    declare let silent: boolean;
  }
  export = loadLanguages;
}
