import styled, { createGlobalStyle } from "styled-components";
import RobotoFont from "../motion-assets/font/Roboto-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: Roboto;
      src: url(${RobotoFont});
      font-weight: normal;
      font-style: normal;
    }
* {
    font-family: Roboto;
    margin: 0;
    padding: 0;
  }
  body {
    height: 100vh;
    background-color: #F8F8F9;
  }
  
`;
