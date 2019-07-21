import {
  MAIN_TEXT,
  SUB_TEXT,
  CONTENT_TEXT,
  BACKGROUND_WHITE,
  DIM_WHITE,
} from './colors';

export const lightTheme = {
  colors: {
    mainText: MAIN_TEXT,
    subText: SUB_TEXT,
    contentText: CONTENT_TEXT,
    background: BACKGROUND_WHITE,
  },
};

export const darkTheme = {
  colors: {
    mainText: SUB_TEXT,
    subText: MAIN_TEXT,
    contentText: DIM_WHITE,
    background: CONTENT_TEXT,
  },
};
