import {
  MAIN_TEXT,
  SUB_TEXT,
  CONTENT_TEXT,
  BACKGROUND_WHITE,
  DIM_WHITE,
  BACKGROUND_BLACK,
  DARKER_WHITE,
  GREY,
} from './colors';

export const lightTheme = {
  colors: {
    mainText: MAIN_TEXT,
    subText: SUB_TEXT,
    contentText: CONTENT_TEXT,
    background: DIM_WHITE,
    reverseBackground: CONTENT_TEXT,
    contentBackground: BACKGROUND_WHITE,
    border: 'transparent',
    horizontal: DARKER_WHITE,
  },
};

export const darkTheme = {
  colors: {
    mainText: MAIN_TEXT,
    subText: SUB_TEXT,
    contentText: BACKGROUND_WHITE,
    background: BACKGROUND_BLACK,
    reverseBackground: DIM_WHITE,
    contentBackground: CONTENT_TEXT,
    border: BACKGROUND_BLACK,
    horizontal: GREY,
  },
};
