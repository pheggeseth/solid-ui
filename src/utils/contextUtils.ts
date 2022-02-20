import { Accessor, JSXElement } from 'solid-js';

export type ExternalContextComponent<T extends Accessor<any>> = (props: {
  children: (context: T) => JSXElement;
}) => JSXElement;
