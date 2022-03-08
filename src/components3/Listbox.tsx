import { JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent, ListOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';
import {
  ActiveDescendentProvider,
  createActiveDescendentContainerProps,
  createActiveDescendentProps,
  useActiveDescendentSelectors,
  useActiveDescendentState,
} from './base/ActiveDescendent';
import { createLabelProps, createLabelTargetProps, LabelProvider } from './base/Label';
import {
  createListboxValueContainerProps,
  createListboxValueItemProps,
  ListboxValueExternalContext,
  ListboxValueProvider,
  useListboxValueSelectors,
} from './base/ListboxValue';
import {
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelContext,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelActions,
  usePanelState,
} from './Panel';
import Popper from './Popper';

function createExternalContext<Value>(config: { id?: string; value?: Value } = {}) {
  const activeDescendentSelectors = useActiveDescendentSelectors();
  const panelState = usePanelState();
  const panelActions = usePanelActions();
  const listboxValueSelectors = useListboxValueSelectors();

  return {
    isActive: () => activeDescendentSelectors.isDescendentActive(config.id),
    isSelected: () => listboxValueSelectors.isSelected(config.value),
    isOpen: () => panelState.isPanelOpen,
    open: () => panelActions.openPanel,
    close: () => panelActions.closePanel,
  } as const;
}

export type ListboxContext = ReturnType<typeof createExternalContext>;

type ListboxExternalContextProp = {
  context?: (ctx: ListboxContext) => void;
};

export type ListboxProviderProps<Value> = Omit<PanelProviderProps, 'context' | 'role'> & {
  popper?: boolean;
  orientation?: ListOrientation;
  value?: Value;
  onChange?: (newValue: Value) => void;
} & ListboxExternalContextProp;

export function ListboxProvider<Value>(props: ListboxProviderProps<Value>) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, [
    'children',
    'context',
    'orientation',
    'popper',
    'value',
    'onChange',
  ]);

  let panelContext: PanelContext;

  let listboxValueContext: ListboxValueExternalContext<Value>;

  const provider = () => (
    <LabelProvider>
      <PanelProvider {...otherProps} context={(ctx) => (panelContext = ctx)} role="listbox">
        <ListboxValueProvider
          value={localProps.value}
          onChange={(newValue) => {
            panelContext.close();
            localProps.onChange(newValue);
          }}
          context={(ctx) => (listboxValueContext = ctx)}
        >
          <ActiveDescendentProvider
            orientation={localProps.orientation}
            shouldHaveInitialFocus={(id) => listboxValueContext.values()[id] === props.value}
          >
            {(() => {
              localProps.context?.(createExternalContext());
              return localProps.children;
            })()}
          </ActiveDescendentProvider>
        </ListboxValueProvider>
      </PanelProvider>
    </LabelProvider>
  );

  localProps.context?.(createExternalContext());

  return localProps.popper ? <Popper>{provider()}</Popper> : provider();
}

export type ListboxLabelProps = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string }>;
    idPrefix?: string;
  } & ListboxExternalContextProp
>;

export function ListboxLabel(props: ListboxLabelProps) {
  props = mergeProps<typeof props[]>({ component: 'span', idPrefix: 'solid-ui-listbox-label' });

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);
  const id = useId(localProps.idPrefix);
  const labelProps = createLabelProps({ id });

  const finalProps = mergeProps(otherProps, labelProps);

  localProps.context?.(createExternalContext());

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-listbox-label=""
      id={id}
    />
  );
}

export type ListboxButtonProps<ListboxButtonElement extends HTMLElement = HTMLButtonElement> =
  BaseComponentProps<
    {
      component?: DynamicComponent<PanelButtonProps<ListboxButtonElement> & { id: string }>;
      idPrefix?: string;
    } & ListboxExternalContextProp
  >;

export function ListboxButton<ListboxButtonElement extends HTMLElement = HTMLButtonElement>(
  props: ListboxButtonProps<ListboxButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-listbox-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<ListboxButtonElement>({ id });

  const finalProps = mergeProps(otherProps, buttonProps);

  localProps.context?.(createExternalContext());

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-listbox-button=""
      id={id}
    />
  );
}

export type ListboxPanelProps<ListboxPanelElement extends HTMLElement = HTMLDivElement> =
  BaseComponentProps<
    {
      component?: DynamicComponent<PanelProps<ListboxPanelElement> & { id: string; role: 'none' }>;
      idPrefix?: string;
      portal?: boolean;
    } & ListboxExternalContextProp
  >;

export function ListboxPanel<ListboxPanelElement extends HTMLElement = HTMLDivElement>(
  props: ListboxPanelProps<ListboxPanelElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-listbox-panel' },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps<ListboxPanelElement>({
    clickAway: true,
    id,
    manageFocus: true,
    tabIndex: -1,
  });

  const finalProps = mergeProps(otherProps, panelProps);

  const panel = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      id={id}
      data-solid-ui-listbox-panel=""
      // if we render this panel, we also need to render options,
      // so options need to have role="listbox", not the panel
      role="none"
    />
  );

  const panelState = usePanelState();

  localProps.context?.(createExternalContext());

  return (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={panel}>
        <Portal>{panel()}</Portal>
      </Show>
    </Show>
  );
}

export type ListboxOptionsProps = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role?: 'listbox' }>;
    idPrefix?: string;
    portal?: boolean;
  } & ListboxExternalContextProp
>;

export function ListboxOptions<Value, ListboxOptionsElement extends HTMLElement = HTMLUListElement>(
  props: ListboxOptionsProps
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-listbox-options', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const containerProps = createActiveDescendentContainerProps({ id });

  const activeDescendentState = useActiveDescendentState();

  const listboxContainerProps = createListboxValueContainerProps<Value, ListboxOptionsElement>({
    activeId: () => activeDescendentState.activeDescendentId,
    search: () => activeDescendentState.search,
  });

  const panelState = usePanelState();

  const panelProps = !panelState.panelId
    ? createPanelProps<ListboxOptionsElement>({
        clickAway: true,
        id,
        manageFocus: true,
        tabIndex: 0,
      })
    : ({} as { onKeyDown: never });

  const labelTargetProps = createLabelTargetProps({ fallbackLabelId: () => panelState.buttonId });

  const onKeyDown: JSX.EventHandler<ListboxOptionsElement, KeyboardEvent> = (event) => {
    containerProps.onKeyDown(event);
    listboxContainerProps.onKeyDown(event);
    panelProps?.onKeyDown(event);
  };

  const finalProps = mergeProps(
    otherProps,
    containerProps,
    listboxContainerProps,
    panelProps,
    labelTargetProps,
    {
      onKeyDown,
    }
  );

  const listboxOptions = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-listbox-options=""
      id={id}
      role="listbox"
    />
  );

  localProps.context?.(createExternalContext<Value>());

  return !panelState.panelId ? (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={listboxOptions}>
        <Portal>{listboxOptions}</Portal>
      </Show>
    </Show>
  ) : (
    listboxOptions()
  );
}

export type ListboxOptionProps<
  Value,
  ListboxOptionElement extends HTMLElement = HTMLLIElement
> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role: 'option' }>;
    idPrefix?: string;
    value?: Value;
  } & ListboxExternalContextProp
>;

export function ListboxOption<Value, ListboxOptionElement extends HTMLElement = HTMLLIElement>(
  props: ListboxOptionProps<Value, ListboxOptionElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'li', idPrefix: 'solid-ui-listbox-option' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix', 'value']);

  const id = useId(localProps.idPrefix);

  const descendentProps = createActiveDescendentProps({ id });
  const listboxValueItemProps = createListboxValueItemProps<Value>({ id, value: localProps.value });

  const finalProps = mergeProps(otherProps, descendentProps, listboxValueItemProps);

  localProps.context?.(createExternalContext<Value>({ id, value: localProps.value }));

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-listbox-option=""
      id={id}
      role="option"
    />
  );
}
