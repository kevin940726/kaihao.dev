let hasSetTheme = false;
let cacheThemeMode = 'light';
const listeners = new Set();

function handleMediaMatch(matchMediaEvent) {
  if (!hasSetTheme) {
    setThemeMode(matchMediaEvent.matches ? 'dark' : 'light');
  }
}

export function setThemeMode(themeMode) {
  if (themeMode !== cacheThemeMode) {
    cacheThemeMode = themeMode;
    document.body.dataset.themeMode = themeMode;

    listeners.forEach(listener => listener(themeMode));
  }
}

export function getThemeMode() {
  return cacheThemeMode;
}

export function isDarkMode() {
  return getThemeMode() === 'dark';
}

export function toggleDarkMode() {
  setThemeMode(cacheThemeMode === 'dark' ? 'light' : 'dark');
  hasSetTheme = true;
}

export function addListener(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

if (typeof window !== 'undefined') {
  const matchDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  setThemeMode(matchDarkMedia.matches ? 'dark' : 'light');

  matchDarkMedia.addListener(handleMediaMatch);
}
