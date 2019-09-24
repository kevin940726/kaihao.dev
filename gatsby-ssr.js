import fs from 'fs';
import path from 'path';
import React from 'react';
import Root from './src/components/Root';

const themeModeScript = fs.readFileSync(
  path.resolve(process.cwd(), './scripts/themeMode.js'),
  'utf8'
);

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: themeModeScript,
      }}
    />,
  ]);
};
