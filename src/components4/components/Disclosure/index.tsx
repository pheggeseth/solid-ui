import { JSX } from 'solid-js';
import { createContent } from './content';
import { createOverlay } from './overlay';
import DisclosureProvider, { DisclosureProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './content';
export * from './overlay';
export * from './provider';
export * from './trigger';

export type DisclosureComponentType = {
  (props: DisclosureProviderProps): JSX.Element;
  createTrigger: typeof createTrigger;
  createOverlay: typeof createOverlay;
  createContent: typeof createContent;
};

const DisclosureComponent = Object.assign(DisclosureProvider, {
  createTrigger,
  createOverlay,
  createContent,
});

export default DisclosureComponent;
