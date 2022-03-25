import { Accessor, JSX, mergeProps, onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import {
  ListboxContext,
  useListboxActions,
  useListboxContext,
  useListboxSelectors,
} from './context';

export type OptionConfig<Value, OptionElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<OptionElement, MouseEvent>;
  value?: Accessor<Value>;
};

export function createOption<Value, OptionElement extends HTMLElement = HTMLElement>(
  config: OptionConfig<Value, OptionElement> = {}
) {
  const props = createOptionProps(config);
  const handlers = createOptionHandlers({
    id: props.id,
    ...config,
  });

  const selectors = useListboxSelectors<Value>();

  const context = {
    ...useListboxContext(),
    isActive: () => selectors.isActive(props.id),
    isSelected: () => selectors.isSelected(config.value()),
  } as const;

  return {
    props: mergeProps(props, handlers),
    effects: () => createOptionEffects({ id: props.id, value: config.value }),
    context,
  } as const;
}

export function createOptionProps<Value, OptionElement extends HTMLElement = HTMLElement>(
  config: OptionConfig<Value, OptionElement>
) {
  const { idPrefix = 'solid-ui-listbox-option' } = config;
  const id = useId(idPrefix);

  const selectors = useListboxSelectors<Value>();

  return {
    get ['aria-selected']() {
      return selectors.isActive(id) || undefined;
    },
    get ['data-active']() {
      return selectors.isActive(id) ? '' : undefined;
    },
    get ['data-selected']() {
      return selectors.isSelected(config.value?.()) ? '' : undefined;
    },
    ...getDataProp(idPrefix),
    id,
    role: 'option',
    tabIndex: -1,
  } as const;
}

export function createOptionHandlers<OptionElement extends HTMLElement = HTMLElement>(config: {
  id: string;
  onClick?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<OptionElement, MouseEvent>;
}) {
  const actions = useListboxActions();

  const onClick: JSX.EventHandler<OptionElement, MouseEvent> = (event) => {
    actions.chooseValue(config.id);
    config.onClick?.(event);
  };

  const onMouseEnter: JSX.EventHandler<OptionElement, MouseEvent> = (event) => {
    actions.focusItem(config.id);
    config.onMouseEnter?.(event);
  };

  const onMouseLeave: JSX.EventHandler<OptionElement, MouseEvent> = (event) => {
    actions.clearItemFocus();
    config.onMouseLeave?.(event);
  };

  return {
    onClick,
    onMouseEnter,
    onMouseLeave,
  } as const;
}

export type CreateOptionEffectsConfig<Value> = { id: string; value: Accessor<Value> };

export function createOptionEffects<Value>(config: CreateOptionEffectsConfig<Value>) {
  addOptionOnMount(config);
  removeOptionOnCleanup(config);
  addValueOnMount(config);
  removeValueOnCleanup(config);
}

export function addOptionOnMount(config: { id: string }) {
  const actions = useListboxActions();
  onMount(() => {
    actions.addItem(config.id);
  });
}

export function removeOptionOnCleanup(config: { id: string }) {
  const actions = useListboxActions();
  onCleanup(() => {
    actions.removeItem(config.id);
  });
}

export function addValueOnMount<Value>(config: CreateOptionEffectsConfig<Value>) {
  const actions = useListboxActions<Value>();
  onMount(() => {
    actions.addValue(config.id, config.value());
  });
}

export function removeValueOnCleanup<Value>(config: CreateOptionEffectsConfig<Value>) {
  const actions = useListboxActions<Value>();
  onCleanup(() => {
    actions.removeValue(config.id);
  });
}
