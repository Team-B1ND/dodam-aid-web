import { css } from "@emotion/react";
import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";

export const markdownStyle = css`
  ${typoCss("Body1", "Medium")};
  color: ${colors.text.primary};
  line-height: 1.7;

  p {
    margin: 0;
    white-space: pre-wrap;
  }

  p + p {
    margin-top: 12px;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 18px 0 10px;
    color: ${colors.text.primary};
  }

  h1 {
    ${typoCss("Heading1", "Bold")};
  }

  h2 {
    ${typoCss("Heading2", "Bold")};
  }

  h3,
  h4 {
    ${typoCss("Body1", "Bold")};
  }

  ul,
  ol {
    margin: 10px 0;
    padding-left: 22px;
  }

  li + li {
    margin-top: 6px;
  }

  li::marker {
    color: ${colors.text.secondary};
  }

  blockquote {
    margin: 12px 0;
    padding: 8px 12px;
    border-left: 3px solid ${colors.border.normal};
    background-color: ${colors.background.default};
    color: ${colors.text.secondary};
  }

  hr {
    border: none;
    border-top: 1px solid ${colors.border.normal};
    margin: 14px 0;
  }

  code {
    padding: 1px 6px;
    border-radius: ${shapes.small};
    background-color: ${colors.background.default};
    font-size: 0.95em;
  }

  pre {
    margin: 10px 0;
    padding: 10px 12px;
    border: 1px solid ${colors.border.disabled};
    border-radius: ${shapes.medium};
    background-color: ${colors.background.default};
    overflow-x: auto;
  }

  pre code {
    padding: 0;
    background-color: transparent;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    border: 1px solid ${colors.border.normal};
  }

  th,
  td {
    padding: 8px 10px;
    border: 1px solid ${colors.border.normal};
    text-align: left;
    vertical-align: top;
  }

  th {
    ${typoCss("Body2", "Bold")};
    background-color: ${colors.background.default};
  }

  a {
    color: ${colors.text.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  img {
    max-width: 100%;
    border-radius: ${shapes.small};
  }
`;
