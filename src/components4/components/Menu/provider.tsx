import { mergeProps, PropsWithChildren } from 'solid-js';
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
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);

  const store = createMenuStore({ orientation: () => props.orientation });

  return (
    <MenuStoreContext.Provider value={store as MenuStore}>
      {(() => {
        props.context?.(useMenuContext());
        return props.children;
      })()}
    </MenuStoreContext.Provider>
  );
}
