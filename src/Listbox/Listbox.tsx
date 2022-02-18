import { Component, JSX, PropsWithChildren } from 'solid-js';
import { InitialMountFocus, useListActions } from '~/List/context';
import { ListInPopoverProvider } from '~/List/ListProvider';
import { PopoverProvider } from '~/Popover';
import Button from './Button';
import Label from './Label';
import Option from './Option';
import Options from './Options';
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
  Label: typeof Label;
  Button: typeof Button;
  Panel: typeof Panel;
  Options: typeof Options;
  Option: typeof Option;
};

const Listbox: ListboxComponentType = Object.assign(ListboxComponent, {
  Label,
  Button,
  Panel,
  Options,
  Option,
});

export default Listbox;
