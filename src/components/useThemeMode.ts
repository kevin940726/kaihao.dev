import { useSyncExternalStore } from 'react';

const themeModeHook =
  typeof window !== 'undefined'
    ? window.__THEME_MODE_HOOK
    : {
        subscribe: (_listener: () => void) => () => {},
        getSnapshot: () => null,
      };

const useThemeMode = () => {
  const themeMode = useSyncExternalStore(
    themeModeHook.subscribe,
    themeModeHook.getSnapshot,
    () => null,
  );

  return themeMode;
};

export const toggleThemeMode = () => {
  window.__THEME_MODE_HOOK.toggle();
};

export default useThemeMode;
