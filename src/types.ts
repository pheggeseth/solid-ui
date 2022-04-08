import { Component, JSX, PropsWithChildren } from 'solid-js';

export type StyleProps = {
  class?: string;
  classList?: {
    [k: string]: boolean | undefined;
  };
  style?: string | JSX.CSSProperties;
};

export type BaseComponent<Props = {}, DataAttribute = {}> = Component<
  Props & StyleProps & { [K in keyof DataAttribute]: DataAttribute[K] }
>;
export type BaseComponentProps<Props = {}, DataAttribute = {}> = PropsWithChildren<
  Props & StyleProps & { [K in keyof DataAttribute]: DataAttribute[K] }
>;

export type ComponentRef<T extends HTMLElement = HTMLElement> = T | ((element: T) => void);

export type ListOrientation = 'vertical' | 'horizontal';
