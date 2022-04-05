import { JSXElement } from 'solid-js';
import { createDescription } from './description';
import { createLabel } from './label';
import { SwitchProvider, SwitchProviderProps } from './provider';
import { createSwitch } from './switch';

export * from './description';
export * from './label';
export * from './provider';
export * from './switch';

export type SwitchComponentType = {
  (props: SwitchProviderProps): JSXElement;
  createDescription: typeof createDescription;
  createLabel: typeof createLabel;
  createSwitch: typeof createSwitch;
};

const SwitchComponent: SwitchComponentType = Object.assign(SwitchProvider, {
  createDescription,
  createLabel,
  createSwitch,
});

export default SwitchComponent;
