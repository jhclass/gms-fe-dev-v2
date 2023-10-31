import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    position:relative;
    margin: 0;
    padding: 0;
    line-height:1.5;
    font-family: 'Pretendard Variable', 'Roboto', sans-serif;
    font-size:16px;

    @media screen and (max-width: 640px) {
      font-size: 13px;
    }
    
    @media screen and (max-width: 960px) {
      font-size: 14px;
    }
  }
`
