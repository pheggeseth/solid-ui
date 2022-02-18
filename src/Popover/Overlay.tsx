import { Component, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
import { Dynamic, Portal, Show } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent } from '~/types';
import { usePopoverActions, usePopoverState } from './context';

type PopoverOverlayDataAttributeProp =
  | { 'data-solid-popover-overlay': '' }
  | { 'data-solid-menu-overlay': '' }
  | { 'data-solid-listbox-overlay': '' };

export type OverlayProps = {
  as?: string | BaseComponent<{ id: string } & PopoverOverlayDataAttributeProp>;
  dataAttribute?:
    | 'data-solid-popover-overlay'
    | 'data-solid-menu-overlay'
    | 'data-solid-listbox-overlay';
};

const Overlay: BaseComponent<OverlayProps> = function Overlay(props) {
  props = mergeProps({ as: 'div', dataAttribute: 'data-solid-popover-overlay' }, props);

  const state = usePopoverState();
  const actions = usePopoverActions();

  const overlayId = useId('popover-overlay');
  actions.registerOverlay(overlayId);

  const [localProps, otherProps] = splitProps(props, ['as', 'dataAttribute']);

  return (
    <Show when={state.isOpen}>
      <OverlayPortal>
        <Dynamic
          {...otherProps}
          component={localProps.as}
          {...({ [localProps.dataAttribute]: '' } as PopoverOverlayDataAttributeProp)}
          id={state.overlayId}
        />
      </OverlayPortal>
    </Show>
  );
};

const OverlayPortal: Component = (props) => {
  const actions = usePopoverActions();

  onMount(() => {
    actions.openOverlay();

    onCleanup(() => {
      actions.closeOverlay();
    });
  });

  return <Portal>{props.children}</Portal>;
};

export default Overlay;
