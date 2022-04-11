import { Accessor, JSX, mergeProps, onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useComboboxActions, useComboboxContext, useComboboxSelectors } from './context';

export type OptionConfig<Value, OptionElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseDown?: JSX.EventHandler<OptionElement, MouseEvent>;
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

  const selectors = useComboboxSelectors<Value>();

  const context = {
    ...useComboboxContext(),
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
  const { idPrefix = 'solid-ui-combobox-option' } = config;
  const id = useId(idPrefix);

  const selectors = useComboboxSelectors<Value>();

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
    'data-solid-ui-list-item': '',
    ...getDataProp(idPrefix),
    id,
    role: 'option',
    tabIndex: -1,
  } as const;
}

export function createOptionHandlers<OptionElement extends HTMLElement = HTMLElement>(config: {
  id: string;
  onClick?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseDown?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<OptionElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<OptionElement, MouseEvent>;
}) {
  const actions = useComboboxActions();

  const onClick: JSX.EventHandler<OptionElement, MouseEvent> = (event) => {
    actions.chooseValue(config.id);
    config.onClick?.(event);
  };

  const onMouseDown: JSX.EventHandler<OptionElement, MouseEvent> = (event) => {
    event.preventDefault();
    config.onMouseDown?.(event);
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
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  } as const;
}

export type CreateOptionEffectsConfig<Value> = { id: string; value: Accessor<Value> };

export function createOptionEffects<Value>(config: CreateOptionEffectsConfig<Value>) {
  addValueOnMount(config);
  removeValueOnCleanup(config);
  addOptionOnMount(config);
  removeOptionOnCleanup(config);
}

export function addOptionOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.addItem(config.id);
  });
}

export function removeOptionOnCleanup(config: { id: string }) {
  const actions = useComboboxActions();
  onCleanup(() => {
    actions.removeItem(config.id);
  });
}

export function addValueOnMount<Value>(config: CreateOptionEffectsConfig<Value>) {
  const actions = useComboboxActions<Value>();
  onMount(() => {
    actions.addValue(config.id, config.value());
  });
}

export function removeValueOnCleanup<Value>(config: CreateOptionEffectsConfig<Value>) {
  const actions = useComboboxActions<Value>();
  onCleanup(() => {
    actions.removeValue(config.id);
  });
}
