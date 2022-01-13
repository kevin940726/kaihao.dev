import type { Theme as ThemeType } from '@/app/theme';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    toggleDarkMode: () => void;
  }
}
