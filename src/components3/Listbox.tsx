import { Accessor, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent, ListOrientation } from '~/types';
import { createComponentContext, getDataProp, useId } from '~/utils/componentUtils';
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
  createListboxValueContext,
  createListboxValueItemProps,
  ListboxValueProvider,
  useListboxValueSelectors,
} from './base/ListboxValue';
import {
  createPanelButtonProps,
  createPanelContext,
  createPanelProps,
  PanelButtonProps,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelActions,
  usePanelState,
} from './base/Panel';
import Popper from './Popper';

export type ListboxContext<Value> = Readonly<{
  isActive: Accessor<boolean>;
  isSelected: (value?: Value) => boolean;
  isOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

function createExternalContext<Value>(
  config: { id?: string; value?: Value } = {}
): ListboxContext<Value> {
  const activeDescendentSelectors = useActiveDescendentSelectors();
  const panelState = usePanelState();
  const panelActions = usePanelActions();
  const listboxValueSelectors = useListboxValueSelectors<Value>();

  return {
    isActive: () => activeDescendentSelectors.isDescendentActive(config.id),
    isSelected: (value?: Value) => listboxValueSelectors.isSelected(value ?? config.value),
    isOpen: () => panelState.isPanelOpen,
    open: () => panelActions.openPanel,
    close: () => panelActions.closePanel,
  } as const;
}

export function createListboxContext<Value>() {
  return createComponentContext<ListboxContext<Value>>();
}

type ListboxContextProp<Value> = {
  context?: (ctx: ListboxContext<Value>) => void;
};

export type ListboxProviderProps<Value> = Omit<PanelProviderProps, 'context' | 'role'> & {
  popper?: boolean;
  orientation?: ListOrientation;
  value?: Value;
  onChange?: (newValue: Value) => void;
} & ListboxContextProp<Value>;

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

  const panelContext = createPanelContext();
  const listboxValueContext = createListboxValueContext<Value>();

  const provider = () => (
    <LabelProvider>
      <PanelProvider {...otherProps} context={panelContext} role="listbox">
        <ListboxValueProvider<Value>
          value={localProps.value}
          onChange={(newValue) => {
            panelContext.close();
            localProps.onChange(newValue);
          }}
          context={listboxValueContext}
        >
          <ActiveDescendentProvider
            orientation={localProps.orientation}
            shouldHaveInitialFocus={(id) => listboxValueContext.values()[id] === props.value}
          >
            {(() => {
              localProps.context?.(createExternalContext<Value>());
              return localProps.children;
            })()}
          </ActiveDescendentProvider>
        </ListboxValueProvider>
      </PanelProvider>
    </LabelProvider>
  );

  return localProps.popper ? <Popper>{provider()}</Popper> : provider();
}

export type ListboxLabelProps<Value> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string }>;
    idPrefix?: string;
  } & ListboxContextProp<Value>
>;

export function ListboxLabel<Value>(props: ListboxLabelProps<Value>) {
  props = mergeProps<typeof props[]>(
    { component: 'span', idPrefix: 'solid-ui-listbox-label' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);
  const id = useId(localProps.idPrefix);
  const labelProps = createLabelProps({ id });

  const finalProps = mergeProps(otherProps, labelProps, getDataProp(localProps.idPrefix));

  localProps.context?.(createExternalContext<Value>());

  return <Dynamic {...finalProps} component={localProps.component} id={id} />;
}

export type ListboxButtonProps<
  Value,
  ListboxButtonElement extends HTMLElement = HTMLButtonElement
> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelButtonProps<ListboxButtonElement> & { id: string }>;
    idPrefix?: string;
  } & ListboxContextProp<Value>
>;

export function ListboxButton<Value, ListboxButtonElement extends HTMLElement = HTMLButtonElement>(
  props: ListboxButtonProps<Value, ListboxButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-listbox-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<ListboxButtonElement>({ id });
  const labelTargetProps = createLabelTargetProps();

  const finalProps = mergeProps(
    otherProps,
    buttonProps,
    labelTargetProps,
    getDataProp(localProps.idPrefix)
  );

  localProps.context?.(createExternalContext<Value>());

  return <Dynamic {...finalProps} component={localProps.component} id={id} />;
}

export type ListboxPanelProps<
  Value,
  ListboxPanelElement extends HTMLElement = HTMLDivElement
> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelProps<ListboxPanelElement> & { id: string; role: 'none' }>;
    idPrefix?: string;
    portal?: boolean;
  } & ListboxContextProp<Value>
>;

export function ListboxPanel<Value, ListboxPanelElement extends HTMLElement = HTMLDivElement>(
  props: ListboxPanelProps<Value, ListboxPanelElement>
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

  const finalProps = mergeProps(otherProps, panelProps, getDataProp(localProps.idPrefix));

  const panel = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      id={id}
      // if we render this panel, we also need to render options,
      // so options need to have role="listbox", not the panel
      role="none"
    />
  );

  const panelState = usePanelState();

  localProps.context?.(createExternalContext<Value>());

  return (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={panel}>
        <Portal>{panel()}</Portal>
      </Show>
    </Show>
  );
}

export type ListboxListProps<Value> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role?: 'listbox' }>;
    idPrefix?: string;
    portal?: boolean;
  } & ListboxContextProp<Value>
>;

export function ListboxList<Value, ListboxListElement extends HTMLElement = HTMLUListElement>(
  props: ListboxListProps<Value>
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-listbox-list', portal: true },
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

  const listboxContainerProps = createListboxValueContainerProps<Value, ListboxListElement>({
    activeId: () => activeDescendentState.activeDescendentId,
    search: () => activeDescendentState.search,
  });

  const panelState = usePanelState();

  const panelProps = !panelState.panelId
    ? createPanelProps<ListboxListElement>({
        clickAway: true,
        id,
        manageFocus: true,
        tabIndex: 0,
      })
    : ({} as { onKeyDown: never });

  const labelTargetProps = createLabelTargetProps({ fallbackLabelId: () => panelState.buttonId });

  const onKeyDown: JSX.EventHandler<ListboxListElement, KeyboardEvent> = (event) => {
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
    },
    getDataProp(localProps.idPrefix)
  );

  const listboxList = () => (
    <Dynamic {...finalProps} component={localProps.component} id={id} role="listbox" />
  );

  localProps.context?.(createExternalContext<Value>());

  return !panelState.panelId ? (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={listboxList}>
        <Portal>{listboxList}</Portal>
      </Show>
    </Show>
  ) : (
    listboxList()
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
  } & ListboxContextProp<Value>
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
  const listboxValueItemProps = createListboxValueItemProps<Value>({
    id,
    value: localProps.value,
  });

  const finalProps = mergeProps(
    otherProps,
    descendentProps,
    listboxValueItemProps,
    getDataProp(localProps.idPrefix)
  );

  localProps.context?.(createExternalContext<Value>({ id, value: localProps.value }));

  return <Dynamic {...finalProps} component={localProps.component} id={id} role="option" />;
}
