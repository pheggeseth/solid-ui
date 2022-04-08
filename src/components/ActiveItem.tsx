import { DeepReadonly, SetStoreFunction } from 'solid-js/store';

export type ActiveItemState = {
  activeItemId: string;
  items: string[];
  search: string;
};

export type ActiveItemSelectors = Readonly<{
  isActive: (itemId: string) => boolean;
}>;

export type ActiveItemActions = Readonly<{
  addItem(id: string): void;
  removeItem(id: string): void;
  initializeItemFocus(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusTypeaheadItem(key: string): void;
  focusItem(itemId: string): void;
  clearItemFocus(): void;
}>;

export type CreateActiveItemActionsConfig = {
  getInitialFocusedItem?: (itemId: string, items?: readonly string[]) => boolean;
  shouldWrap?: boolean;
};

export function createActiveItemActions(
  setState: SetStoreFunction<ActiveItemState>,
  config: CreateActiveItemActionsConfig = {}
): ActiveItemActions {
  const getActiveItemIndex = (state: DeepReadonly<ActiveItemState>) =>
    state.items.findIndex((id) => id === state.activeItemId);

  let resetSearch: NodeJS.Timeout;

  return {
    addItem(item) {
      setState('items', (items) => [...items, item]);
    },
    removeItem(itemId) {
      setState('items', (items) => items.filter((id) => id !== itemId));
    },
    initializeItemFocus() {
      setState((state) => {
        if (config.getInitialFocusedItem) {
          const id = state.items.find((item) => config.getInitialFocusedItem(item, state.items));
          if (id) {
            return { activeItemId: id };
          } else {
            return state;
          }
        }

        return state;
      });
    },
    focusNextItem() {
      setState((state) => {
        let activeItemIndex = getActiveItemIndex(state);
        if (config.shouldWrap && activeItemIndex === state.items.length - 1) {
          activeItemIndex = -1;
        }

        if (activeItemIndex < state.items.length - 1) {
          return { activeItemId: state.items[activeItemIndex + 1] };
        }
      });
    },
    focusPreviousItem() {
      setState((state) => {
        let activeItemIndex = getActiveItemIndex(state);
        if (config.shouldWrap && activeItemIndex === 0) {
          activeItemIndex = state.items.length;
        }

        if (activeItemIndex === -1) {
          return { activeItemId: state.items[state.items.length - 1] };
        } else if (activeItemIndex > 0) {
          return { activeItemId: state.items[activeItemIndex - 1] };
        }

        return state;
      });
    },
    focusFirstItem() {
      setState((state) => ({ activeItemId: state.items[0] }));
    },
    focusLastItem() {
      setState((state) => ({ activeItemId: state.items[state.items.length - 1] }));
    },
    focusTypeaheadItem(key: string) {
      clearTimeout(resetSearch);

      setState((state) => {
        const search = state.search + key;
        const activeItemIndex = getActiveItemIndex(state);
        const wrappedItems = state.items
          .slice(activeItemIndex + 1)
          .concat(state.items.slice(0, activeItemIndex));

        const searchTerm = search.toLocaleLowerCase();
        const matchingItemId = wrappedItems.find((id) =>
          document.getElementById(id).textContent.toLocaleLowerCase().startsWith(searchTerm)
        );

        if (matchingItemId) {
          return { activeItemId: matchingItemId, search };
        } else {
          return { search };
        }
      });

      resetSearch = setTimeout(() => {
        setState('search', '');
      }, 500);
    },
    focusItem(itemId) {
      setState('activeItemId', itemId);
    },
    clearItemFocus() {
      setState('activeItemId', null);
    },
  };
}

// export type CreateActiveItemContainerPropsConfig = {
//   disableTypeahead?: boolean;
//   excludeAriaProps?: boolean;
//   tabIndex?: string | number;
// };

// export function createActiveItemContainerOnKeyDown<ContainerElement extends HTMLElement>(config: {
//   disableTypeahead?: boolean;
// }) {
//   const state = useActiveItemState();
//   const actions = useActiveItemActions();

//   return useKeyEventHandlers<ContainerElement>({
//     ArrowUp(event) {
//       if (state.orientation === 'vertical') {
//         event.preventDefault();
//         actions.focusPreviousItem();
//       }
//     },
//     ArrowDown(event) {
//       if (state.orientation === 'vertical') {
//         event.preventDefault();
//         actions.focusNextItem();
//       }
//     },
//     ArrowLeft(event) {
//       if (state.orientation === 'horizontal') {
//         event.preventDefault();
//         actions.focusPreviousItem();
//       }
//     },
//     ArrowRight(event) {
//       if (state.orientation === 'horizontal') {
//         event.preventDefault();
//         actions.focusNextItem();
//       }
//     },
//     Home(event) {
//       event.preventDefault();
//       actions.focusFirstDescendent();
//     },
//     End(event) {
//       event.preventDefault();
//       actions.focusLastItem();
//     },
//     default(event) {
//       if (event.key.length === 1 && !config.disableTypeahead) {
//         if (!state.search && event.key === ' ') {
//           return;
//         } else {
//           actions.focusTypeaheadItem(event.key);
//         }
//       }
//     },
//   });
// }

// export function createActiveItemContainerProps<ContainerElement extends HTMLElement>(
//   config: CreateActiveItemContainerPropsConfig = {}
// ) {
//   const state = useActiveItemState();
//   const actions = useActiveItemActions();

//   const onKeyDown = createActiveItemContainerOnKeyDown({
//     disableTypeahead: config.disableTypeahead,
//   });

//   return {
//     get ['aria-activedescendent']() {
//       return state.activeItemId;
//     },
//     'data-solid-ui-list': '',
//     onFocus() {
//       actions.initializeItemFocus();
//     },
//     onKeyDown,
//     tabIndex: config.tabIndex ?? 0,
//   };
// }

// export type CreatActiveItemPropsConfig = {
//   id: string;
// };

// export function createActiveItemProps(config: CreatActiveItemPropsConfig) {
//   const state = useActiveItemState();
//   const selectors = useActiveItemSelectors();
//   const actions = useActiveItemActions();

//   onMount(() => actions.addItem(config.id));
//   onCleanup(() => actions.removeItem(config.id));

//   createEffect(() => {
//     if (state.activeItemId === config.id) {
//       // TODO: figure out a better way of scrolling a descendent into view if necessary
//       // document.getElementById(config.id).scrollIntoView(false);
//     }
//   });

//   return {
//     get ['aria-selected']() {
//       return selectors.isItemActive(config.id) || undefined;
//     },
//     get ['data-active']() {
//       return selectors.isItemActive(config.id) ? '' : undefined;
//     },
//     'data-solid-ui-list-item': '',
//     onMouseEnter() {
//       actions.focusItem(config.id);
//     },
//     onMouseLeave() {
//       actions.clearItemFocus();
//     },
//     tabIndex: -1,
//   };
// }
