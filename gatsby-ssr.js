import React from 'react';
import Root from './src/components/Root';

export const wrapRootElement = ({ element }) => <Root>{element}</Root>;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
var hasSetTheme = false;
var cacheThemeMode = 'light';
var listeners = [];

var __THEME_MODE_HOOK = {
  setThemeMode: function(themeMode) {
    if (themeMode !== cacheThemeMode) {
      cacheThemeMode = themeMode;
      document.body.dataset.themeMode = themeMode;

      listeners.forEach(function(listener) {
        listener(themeMode);
      });
    }
  },
  getThemeMode: function() {
    return cacheThemeMode;
  },
  toggleDarkMode: function() {
    __THEME_MODE_HOOK.setThemeMode(
      cacheThemeMode === 'dark' ? 'light' : 'dark'
    );
    hasSetTheme = true;
  },
  addListener(listener) {
    listeners.push(listener);

    return function() {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  },
};

function handleMediaMatch(matchMediaEvent) {
  if (!hasSetTheme) {
    __THEME_MODE_HOOK.setThemeMode(
      matchMediaEvent.matches ? 'dark' : 'light'
    );
  }
}

window.__THEME_MODE_HOOK = __THEME_MODE_HOOK;

var matchDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

__THEME_MODE_HOOK.setThemeMode(matchDarkMedia.matches ? 'dark' : 'light');

matchDarkMedia.addListener(handleMediaMatch);
})();`,
      }}
    />,
  ]);
};
