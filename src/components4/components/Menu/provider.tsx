import { PropsWithChildren } from 'solid-js';
import { ListOrientation } from '~/types';
import {
  createMenuStore,
  MenuContextProp,
  MenuStore,
  MenuStoreContext,
  useMenuContext,
} from './context';

export type MenuProviderProps = PropsWithChildren<
  MenuContextProp & {
    orientation?: ListOrientation;
  }
>;

export default function MenuProvider(props: MenuProviderProps) {
  const store = createMenuStore();

  return (
    <MenuStoreContext.Provider value={store as MenuStore}>
      {(() => {
        props.context?.(useMenuContext());
        return props.children;
      })()}
    </MenuStoreContext.Provider>
  );
}
