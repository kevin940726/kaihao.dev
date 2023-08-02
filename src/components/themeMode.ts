type ThemeMode = 'light' | 'dark';
type Listener = () => void;

declare global {
  interface Window {
    __THEME_MODE_HOOK: {
      getSnapshot: () => ThemeMode;
      subscribe: (listener: Listener) => () => void;
      toggle: () => void;
    };
  }
}

export const themeModeScript = function () {
  const STORAGE_KEY = 'kaihao.dev/themeMode' as const;
  const matchLightMedia = window.matchMedia('(prefers-color-scheme: light)');

  class ThemeModeHook {
    #themeMode: ThemeMode;
    #userPreference: boolean = false;
    #listeners = new Set<Listener>();

    constructor() {
      try {
        this.#themeMode = window.sessionStorage.getItem(
          STORAGE_KEY
        ) as ThemeMode;
        if (this.#themeMode) {
          this.#userPreference = true;
        }
      } finally {
        this.#themeMode ||= matchLightMedia.matches ? 'light' : 'dark';
      }

      document.body.dataset.themeMode = this.#themeMode;

      if (!this.#userPreference) {
        matchLightMedia.addEventListener('change', () => {
          if (!this.#userPreference) {
            const themeMode = matchLightMedia.matches ? 'light' : 'dark';
            if (themeMode !== this.#themeMode) {
              this.#themeMode = themeMode;
              this.#listeners.forEach((listener) => {
                listener();
              });
            }
          }
        });
      }
    }

    getSnapshot = () => this.#themeMode;

    subscribe = (listener: Listener) => {
      this.#listeners.add(listener);

      return () => {
        this.#listeners.delete(listener);
      };
    };

    toggle = () => {
      const themeMode = this.#themeMode === 'dark' ? 'light' : 'dark';
      this.#themeMode = themeMode;
      this.#userPreference = true;

      try {
        window.sessionStorage.setItem(STORAGE_KEY, themeMode);
      } catch {}

      document.body.dataset.themeMode = this.#themeMode;

      this.#listeners.forEach((listener) => {
        listener();
      });
    };
  }

  window.__THEME_MODE_HOOK = new ThemeModeHook();
};
