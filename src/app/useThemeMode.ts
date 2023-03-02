import { useSyncExternalStore } from 'react';

const themeModeHook =
  typeof window !== 'undefined'
    ? window.__THEME_MODE_HOOK
    : {
        subscribe: (_listener: () => void) => () => {},
        getSnapshot: () => 'dark',
      };

const useThemeMode = () => {
  const themeMode = useSyncExternalStore(
    themeModeHook.subscribe,
    themeModeHook.getSnapshot,
    themeModeHook.getSnapshot
  );

  return themeMode;
};

export default useThemeMode;
