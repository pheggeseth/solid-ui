import { JSXElement } from 'solid-js';
import { createContent } from './content';
import DisclosureProvider, { DisclosureProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './content';
export * from './context';
export * from './provider';
export * from './trigger';

export type DisclosureComponentType = {
  (props: DisclosureProviderProps): JSXElement;
  createTrigger: typeof createTrigger;
  createContent: typeof createContent;
};

const DisclosureComponent: DisclosureComponentType = Object.assign(DisclosureProvider, {
  createTrigger,
  createContent,
});

export default DisclosureComponent;
