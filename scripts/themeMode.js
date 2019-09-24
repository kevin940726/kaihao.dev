(function() {
  var hasSetTheme = false;
  var cacheThemeMode = 'light';
  var listeners = [];
  var STORAGE_KEY = 'kaihao.dev/themeMode';

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
      var themeMode = cacheThemeMode === 'dark' ? 'light' : 'dark';
      __THEME_MODE_HOOK.setThemeMode(themeMode);
      hasSetTheme = true;

      try {
        window.sessionStorage.setItem(STORAGE_KEY, themeMode);
      } catch (err) {}
    },
    addListener: function(listener) {
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
  var initialThemeMode = matchDarkMedia.matches ? 'dark' : 'light';

  try {
    initialThemeMode =
      window.sessionStorage.getItem(STORAGE_KEY) || initialThemeMode;
  } catch (err) {}

  __THEME_MODE_HOOK.setThemeMode(initialThemeMode);

  matchDarkMedia.addListener(handleMediaMatch);
})();
