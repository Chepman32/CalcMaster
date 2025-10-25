import { lightTheme, darkTheme } from './colors';

export { lightTheme, darkTheme };

export const getTheme = (isDark: boolean) => {
  return isDark ? darkTheme : lightTheme;
};
