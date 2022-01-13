type ThemeMode = 'light' | 'dark';
type Listener = (themeMode: ThemeMode) => void;

let hasSetTheme = false;
let cacheThemeMode: ThemeMode = 'light';
const listeners: Listener[] = [];
const STORAGE_KEY = 'kaihao.dev/themeMode' as const;

const __THEME_MODE_HOOK = {
  setThemeMode(themeMode: ThemeMode) {
    if (themeMode !== cacheThemeMode) {
      cacheThemeMode = themeMode;
      document.body.dataset.themeMode = themeMode;

      listeners.forEach((listener) => {
        listener(themeMode);
      });
    }
  },
  getThemeMode() {
    return cacheThemeMode;
  },
  toggleDarkMode() {
    const themeMode = cacheThemeMode === 'dark' ? 'light' : 'dark';
    __THEME_MODE_HOOK.setThemeMode(themeMode);
    hasSetTheme = true;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, themeMode);
    } catch (err) {}
  },
  addListener(listener: Listener) {
    listeners.push(listener);

    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  },
};

function handleMediaMatch(matchMediaEvent: MediaQueryListEvent) {
  if (!hasSetTheme) {
    __THEME_MODE_HOOK.setThemeMode(matchMediaEvent.matches ? 'dark' : 'light');
  }
}

declare global {
  interface Window {
    __THEME_MODE_HOOK: typeof __THEME_MODE_HOOK;
  }
}

window.__THEME_MODE_HOOK = __THEME_MODE_HOOK;

const matchDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
let initialThemeMode: ThemeMode = matchDarkMedia.matches ? 'dark' : 'light';

try {
  initialThemeMode =
    (window.sessionStorage.getItem(STORAGE_KEY) as ThemeMode) ||
    initialThemeMode;
} catch (err) {}

__THEME_MODE_HOOK.setThemeMode(initialThemeMode);

matchDarkMedia.addEventListener('change', handleMediaMatch);

export { __THEME_MODE_HOOK };
