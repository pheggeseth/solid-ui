import { Component, JSXElement, PropsWithChildren } from 'solid-js';
import { ListInPopoverProvider } from '~/oldComponents/List/ListProvider';
import { Popover } from '~/oldComponents/Popover';
import Button from './Button';
import Item from './Item';
import Items from './Items';
import Overlay from './Overlay';
import Panel from './Panel';

export const MenuProvider: Component = (props) => {
  return (
    <Popover>
      <ListInPopoverProvider>{props.children}</ListInPopoverProvider>
    </Popover>
  );
};

type MenuComponent = {
  (props: PropsWithChildren): JSXElement;
  Button: typeof Button;
  Item: typeof Item;
  Items: typeof Items;
  Overlay: typeof Overlay;
  Panel: typeof Panel;
};

const Menu: MenuComponent = Object.assign(MenuProvider, {
  Button,
  Item,
  Items,
  Overlay,
  Panel,
});

export default Menu;
