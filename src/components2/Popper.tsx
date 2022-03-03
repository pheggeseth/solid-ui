import { createPopper, Options } from '@popperjs/core';
import {
  createContext,
  createEffect,
  JSXElement,
  PropsWithChildren,
  splitProps,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

const PopperContext = createContext<ReturnType<typeof usePopper>>();
export const usePopperContext = () => useContext(PopperContext);

type PopperProviderProps = PropsWithChildren<Partial<Options>>;

export function PopperProvider(props: PopperProviderProps) {
  const [localProps, popperProps] = splitProps(props, ['children']);

  const popper = usePopper(popperProps);

  return <PopperContext.Provider value={popper}>{localProps.children}</PopperContext.Provider>;
}

export function PopperAnchorRef<AnchorElement extends HTMLElement>(element: AnchorElement) {
  usePopperContext()?.setRef('anchor', element);
}

export function PopperRef<PopperElement extends HTMLElement>(element: PopperElement) {
  usePopperContext()?.setRef('popper', element);
}

export function usePopper(props: Partial<Options> = {}) {
  const [refs, setRefs] = createStore<{
    anchor: HTMLElement;
    popper: HTMLElement;
  }>({ anchor: null, popper: null });

  let popperInstance;

  createEffect(() => {
    popperInstance?.destroy();

    if (refs.anchor && refs.popper) {
      const { placement = 'bottom-start', ...otherProps } = props;

      popperInstance = createPopper(refs.anchor, refs.popper as unknown as HTMLElement, {
        placement,
        ...otherProps,
        modifiers: [
          ...(otherProps.modifiers || []),
          {
            name: 'offset',
            options: { offset: [0, 4] },
          },
        ],
      });
    }
  });

  return {
    refs,
    setRef: (type: 'anchor' | 'popper', element: HTMLElement) => {
      setRefs({ [type]: element });
    },
  };
}

type PopperComponentType = {
  (props: PopperProviderProps): JSXElement;
  AnchorRef: typeof PopperAnchorRef;
  PopperRef: typeof PopperRef;
};

const PopperComponent: PopperComponentType = Object.assign(PopperProvider, {
  AnchorRef: PopperAnchorRef,
  PopperRef,
});

export default PopperComponent;
