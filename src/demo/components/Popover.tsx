import { Component, createEffect, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Popover from '../../components/Popover';
import Popper from '../../components/Popper';
import { CodeBlock } from '../utils';

const PopoverTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Popover.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
};

const PopoverOverlay: Component = (props) => {
  const { props: overlayProps, effects, context } = Popover.createOverlay();

  createEffect(() => {
    if (context.isOverlayOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOverlayOpen()}>
      <Portal>
        <div {...overlayProps}>{props.children}</div>
      </Portal>
    </Show>
  );
};

const PopoverPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

const MyPopover: Component = () => {
  return (
    <Popper>
      <Popover>
        <PopoverTrigger ref={Popper.AnchorRef}>Open popover</PopoverTrigger>
        <PopoverOverlay />
        <PopoverPanel ref={Popper.PopperRef}>
          <span style={{ 'margin-right': '20px' }}>This is the content of the popover.</span>
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverPanel>
      </Popover>
    </Popper>
  );
};

export const PopoverDemo = () => {
  return (
    <section>
      <h2 id="Popover">Popover</h2>
      <p>A popover is a floating panel that appears near an anchor point.</p>
      <h3>Example</h3>
      <MyPopover />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
};

PopoverDemo.Link = () => (
  <li>
    <a href="#Popover">Popover</a>
  </li>
);

const exampleCode = `import { Component, createEffect, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '@solid-ui/types';
import Popover from '@solid-ui/popover';
import Popper from '@solid-ui/popper';

const PopoverTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Popover.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
};

const PopoverOverlay: Component = (props) => {
  const { props: overlayProps, effects, context } = Popover.createOverlay();

  createEffect(() => {
    if (context.isOverlayOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOverlayOpen()}>
      <Portal>
        <div {...overlayProps}>{props.children}</div>
      </Portal>
    </Show>
  );
};

const PopoverPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

const MyPopover: Component = () => {
  return (
    <Popper>
      <Popover>
        <PopoverTrigger ref={Popper.AnchorRef}>Open popover</PopoverTrigger>
        <PopoverOverlay />
        <PopoverPanel ref={Popper.PopperRef}>
          <span style={{ 'margin-right': '20px' }}>This is the content of the popover.</span>
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverPanel>
      </Popover>
    </Popper>
  );
};`;
