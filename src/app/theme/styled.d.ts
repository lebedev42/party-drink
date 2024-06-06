import 'styled-components';

type Colors = {
  white: string;
};

type Shadows = {
  s: string;
  m: string;
  l: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    shadows: Shadows;
    media?: {
      isMobile: boolean;
      isTablet: boolean;
    };
  }
}
