import { createEffect } from 'solid-js';
import { Code, CodeBlock } from './utils';

export function Background() {
  return (
    <section>
      <h2 id="Background">Background</h2>
      <p>
        Solid UI is a set of hooks for creating accessible, composible UI components using SolidJS.
      </p>
      <p>Every hook, for every component, returns an object with the same structure:</p>
      <CodeBlock>{example1}</CodeBlock>
      <h3>
        <Code>props</Code>
      </h3>
      <p>
        The props needed for the component. This object needs to be spread out onto the underlying
        root element of the component.
      </p>
      <h3>
        <Code>effects</Code>
      </h3>
      <p>
        This function creates any effects needed by the component using functions from SolidJS such
        as <Code>createEffect</Code> and <Code>onMount</Code>.
      </p>
      <p>
        <Code>effects</Code> needs to be called when the underlying element/component with our{' '}
        <Code>props</Code> <strong>mounts</strong>, and <strong>not</strong> when the parent
        component mounts. This is because <Code>effects</Code> may contain <Code>onMount</Code>{' '}
        hooks that expect the element with <Code>props</Code> to have been rendered to the DOM.
      </p>
      <p>For example, the following won't properly register effects:</p>
      <CodeBlock>{example2}</CodeBlock>
      <p>
        as <Code>effects()</Code> is called when <Code>PopoverPanel</Code> mounts, and{' '}
        <strong>not</strong> when the <Code>{`<div {...panelProps} />`}</Code> mounts. This can be
        easily fixed by wrapping the <Code>effects()</Code> call in <Code>createEffect</Code>:
      </p>
      <CodeBlock>{example3}</CodeBlock>
      <p>
        If the component does not require any effects, it will not provide an <Code>effects</Code>{' '}
        property.
      </p>
      <h3>
        <Code>context</Code>
      </h3>
      <p>
        An object that exposes certain pieces of internal sate, or callbacks to manually change that
        state. For example, the context for <Code>Popover</Code> is:
      </p>
      <CodeBlock>{example4}</CodeBlock>
      <p>
        The first two properties are <Code>Accessor</Code>s that return pieces of internal state,
        while the last two properties can alter that state by manually opening or closing the{' '}
        <Code>Popover</Code>.
      </p>
      <p>
        Often, in components written with libraries like React, you will see internal context being
        exposed through a "render prop" pattern, where the <Code>children</Code> of the component is
        supplied as a function which can receive parameters from the parent component:
      </p>
      <CodeBlock>{example5}</CodeBlock>
      <p>
        As component functions in SolidJS only get called once, the "render prop" pattern becomes
        tricky to use (as our render prop function would only get called once).
      </p>
      <p>
        Solid UI decides to return a <Code>context</Code> object from its component hooks, whose
        properties are either callbacks or SolidJS reactive primitives:
      </p>
      <CodeBlock>{example6}</CodeBlock>
    </section>
  );
}

Background.Link = () => (
  <li>
    <a href="#Background">Background</a>
  </li>
);

const example1 = `import Popover from '@solid-ui/popover';

function PopoverTrigger() {
  const { props, effects, context } = Popover.createTrigger();

  effects();

  return <button { ...props }>{ context.isPopoverOpen() ? 'Close' : 'Open' }</button>
}`;

const example2 = `import { Component, Show } from 'solid-js';

const PopoverPanel: Component = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  effects();

  return (
    <Show when={context.isPopoverOpen()}>
      <div {...panelProps}>{props.children}</div>
    </Show>
  );
};`;

const example3 = `import { Component, createEffect, Show } from 'solid-js';

const PopoverPanel: Component = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects(); // 'effects' is now called after the 'div' mounts
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <div {...panelProps}>{props.children}</div>
    </Show>
  );
};`;

const example4 = `import { Accessor } from 'solid-js';

export type PopoverContext = Readonly<{
  isPopoverOpen: Accessor<boolean>;
  isOverlayOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;`;

const example5 = `import SomeComponent from 'some-react-library';

function ReactRenderProps() {
  return (
    <SomeComponent>
      {({ isActive }) => <div style={{ background: isActive ? 'red' : 'blue' }}></div>}
    </SomeComponent>
  );
}`;

const example6 = `function SolidUIContext() {
  const { props, context } = SomeComponent.createPart();

  return <div {...props} style={{ background: context.isActive() ? 'red' : 'blue' }}></div>;
}`;

const multipleExample = `function MyComponent() {
  const {
    props: parentProps,
    effects: parentEffects,
    context: parentContext,
  } = SomeComponent.createParent();

  const {
    props: childProps,
    effects: childEffects,
    context: childContext,
  } = SomeComponent.createChild();

  parentEffects();

  createEffect(() => {
    if (childContext.isBehaving()) {
      childEffects();
    }
  });

  return (
    <div {...parentProps} style={{ background: parentContext.isMad() ? 'red' : 'green' }}>
      <Show when={childContext.isBehaving()}>
        <div {...childProps}></div>
      </Show>
    </div>
  );
}`;
