let hasSetTheme = false;
let cacheThemeMode = 'light';

function handleMediaMatch(matchMediaEvent) {
  if (!hasSetTheme) {
    setThemeMode(matchMediaEvent.matches ? 'dark' : 'light');
  }
}

export function setThemeMode(themeMode) {
  if (themeMode !== cacheThemeMode) {
    cacheThemeMode = themeMode;
    document.body.dataset.themeMode = themeMode;
  }
}

export function isDarkMode() {
  return cacheThemeMode === 'dark';
}

export function toggleDarkMode() {
  setThemeMode(cacheThemeMode === 'dark' ? 'light' : 'dark');
  hasSetTheme = true;
}

if (typeof window !== 'undefined') {
  const matchDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  setThemeMode(matchDarkMedia.matches ? 'dark' : 'light');

  matchDarkMedia.addListener(handleMediaMatch);
}
