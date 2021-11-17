import { CSSProp } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title?: string;
    primary?: string;
    secondary?: string;
    text: string;
    bg?: string;
    canvas?: string;
    controls?: string;
    bgImage?: string;
    spinner?: string;
  }
}

declare module 'react' {
  export interface Attributes {
    css?: CSSProp;
  }
}

declare module 'styled-components' {
  export interface StyledFlexProps {
    display: string;
    direction: string;
    align: string;
    justify: string;
    margin: string;
  }
}
