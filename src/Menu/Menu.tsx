import { Component, JSXElement, PropsWithChildren } from 'solid-js';
import { ListInPopoverProvider } from '~/List/ListProvider';
import { PopoverProvider } from '~/Popover';
import Button from './Button';
import Item from './Item';
import Items from './Items';
import Panel from './Panel';

export const MenuProvider: Component = (props) => {
  return (
    <PopoverProvider>
      <ListInPopoverProvider>{props.children}</ListInPopoverProvider>
    </PopoverProvider>
  );
};

type MenuComponent = {
  (props: PropsWithChildren): JSXElement;
  Button: typeof Button;
  Panel: typeof Panel;
  Items: typeof Items;
  Item: typeof Item;
};

const Menu: MenuComponent = Object.assign(MenuProvider, {
  Button,
  Panel,
  Items,
  Item,
});

export default Menu;
