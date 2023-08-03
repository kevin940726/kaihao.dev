import fs from 'fs/promises';
import path from 'path';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import { transform } from 'esbuild';

async function getThemeModeScript() {
  const code = await fs.readFile(
    path.resolve(process.cwd(), 'src/app/themeMode.ts'),
    'utf-8'
  );
  const result = await transform(code, {
    loader: 'ts',
    format: 'iife',
    minify: true,
  });

  return result.code;
}
const themeModeScriptPromise = getThemeModeScript();

class Document extends NextDocument<{ themeModeScript: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const themeModeScript = await themeModeScriptPromise;
    return { ...initialProps, themeModeScript };
  }

  render() {
    return (
      <Html className="h-full tab">
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed"
            href="/rss.xml"
          />
        </Head>
        <body className="h-full text-contentText bg-contentBackground">
          <script
            dangerouslySetInnerHTML={{ __html: this.props.themeModeScript }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
