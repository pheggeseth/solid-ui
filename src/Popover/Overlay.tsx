import { Component, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
import { Dynamic, Portal, Show } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent } from '~/types';
import { usePopoverActions, usePopoverState } from './context';

type OverlayProps = {
  as?: string | BaseComponent<{ id: string }>;
};

export const Overlay: BaseComponent<OverlayProps> = function Overlay(props) {
  props = mergeProps({ as: 'div' }, props);

  const state = usePopoverState();
  const actions = usePopoverActions();

  const overlayId = useId('popover-overlay');
  actions.registerOverlay(overlayId);

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Show when={state.isOpen}>
      <OverlayPortal>
        <Dynamic {...otherProps} component={localProps.as} id={state.overlayId} />
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
