import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

  body {
    position:relative;
    margin: 0;
    padding: 0;
    line-height:1.5;
    font-weight: 400;
    font-family:'Pretendard-Regular', 'Roboto', sans-serif;
    font-size: 16px;

    @media screen and (max-width: 640px) {
      font-size: 11px;
    }
    
    @media screen and (max-width: 1024px) {
      font-size: 14px;
    }
  }
`
