import { Component } from 'solid-js';

export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];

type CodeLanguage = 'css' | 'html' | 'tsx';
export const Code: Component<{ language?: CodeLanguage }> = (props) => (
  <code class={`language-${props.language || 'tsx'}`}>{props.children}</code>
);

export const CodeBlock: Component<{ language?: CodeLanguage }> = (props) => (
  <pre>
    <Code language={props.language}>{props.children}</Code>
  </pre>
);
