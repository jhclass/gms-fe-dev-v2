import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{margin:0; padding:0; box-sizing:border-box;}
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  li {list-style: none;}
  a {text-decoration:none;}

  // 여기에 더 많은 전역 스타일을 추가할 수 있습니다.
`;

export default GlobalStyle;
