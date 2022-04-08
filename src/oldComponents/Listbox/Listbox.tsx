import { Component, JSX, PropsWithChildren } from 'solid-js';
import { InitialMountFocus, useListActions } from '~/oldComponents/List/context';
import { ListInPopoverProvider } from '~/oldComponents/List/ListProvider';
import { Popover as PopoverProvider } from '~/oldComponents/Popover';
import Button from './Button';
import Label from './Label';
import Option from './Option';
import Options from './Options';
import Overlay from './Overlay';
import Panel from './Panel';

export type ListboxProviderProps = {
  value?: any;
  onChange?: (value: any) => void;
};

export const ListboxProvider: Component = (props) => {
  const ListActions = useListActions();

  ListActions.onInitialMountFocusChange(InitialMountFocus.Selected);

  return props.children;
};

const ListboxComponent: Component<ListboxProviderProps> = (props) => {
  return (
    <PopoverProvider>
      <ListInPopoverProvider value={props.value} onChange={props.onChange}>
        <ListboxProvider>{props.children}</ListboxProvider>
      </ListInPopoverProvider>
    </PopoverProvider>
  );
};

type ListboxComponentType = {
  (props: PropsWithChildren<ListboxProviderProps>): JSX.Element;
  Button: typeof Button;
  Label: typeof Label;
  Option: typeof Option;
  Options: typeof Options;
  Overlay: typeof Overlay;
  Panel: typeof Panel;
};

const Listbox: ListboxComponentType = Object.assign(ListboxComponent, {
  Button,
  Label,
  Option,
  Options,
  Overlay,
  Panel,
});

export default Listbox;
