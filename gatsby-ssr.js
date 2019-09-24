import fs from 'fs';
import path from 'path';
import React from 'react';
import Root from './src/components/Root';

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: fs.readFileSync(
          path.resolve(__dirname, './scripts/themeMode.js'),
          'utf8'
        ),
      }}
    />,
  ]);
};
