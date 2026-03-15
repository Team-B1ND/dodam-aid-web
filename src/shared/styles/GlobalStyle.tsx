import { css, Global } from "@emotion/react";

const style = css`
  @font-face {
    font-family: "Pretendard";
    font-weight: 100;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Thin.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 200;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-ExtraLight.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 300;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Light.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Medium.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 600;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-SemiBold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Bold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 800;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-ExtraBold.woff") format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 900;
    font-display: swap;
    src: url("../assets/fonts/Pretendard-Black.woff") format("woff");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    word-break: keep-all;
    user-select: none;
  }

  body {
    background-color: var(--dds-color-background-default);
    color: var(--dds-color-text-primary);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  input,
  textarea,
  select {
    font: inherit;
    outline: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
