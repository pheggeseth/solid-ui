import { PopoverStoreContext } from '~/components/Popover';
import { Code, CodeBlock } from './utils';

export function Background() {
  return (
    <section>
      <h2 id="Background">Background</h2>
      <p>
        Solid UI is a low-level library for declaratively building accessible, composable UI
        components using reactive primitives/hooks built with SolidJS. Rather than expose pre-built
        components, Solid UI gives you simple, consistent hooks which take care of managing the
        props, effect, and internal state needed to build UI components that follow WAI-ARIA
        accessibility recommendations.
      </p>
      <p>
        Solid UI is still actively being built, and many of the component hooks below are not
        feature complete, are untested, and not considered not ready for production use.
      </p>
      <p>
        This library was written as part of the SolidJS "SolidHack 2022" community hackathon. These
        docs reference components as being available as part of the <Code>@solid-ui</Code> NPM
        package, though this library is not actually hosted yet.
      </p>
      <h3>Installation</h3>
      <p>For each component, you have the option of importing hooks individually:</p>
      <CodeBlock>{`import { createTrigger, createPanel } from '@solid-ui/popover';`}</CodeBlock>
      <p>or all at once from the component's default import:</p>
      <CodeBlock>{example0}</CodeBlock>
      <h3>General API</h3>
      <p>Every hook, for every component, returns an object with the same API:</p>
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
        Instead, Solid UI returns a <Code>context</Code> object from its component hooks, whose
        properties are either callbacks or SolidJS reactive primitives:
      </p>
      <CodeBlock>{example6}</CodeBlock>
      <h3>Component stores and provider components</h3>
      <p>
        Every Solid UI component relies on a SolidJS <Code>store</Code> being provided using SolidJS{' '}
        <Code>context</Code>.
      </p>
      <p>
        Stores can be created using a component's "createStore" hook and provided using the
        corresponding component Context provider:
      </p>
      <CodeBlock>{example7}</CodeBlock>
      <p>
        The only components that Solid UI exports directly are context provider components. Every
        composable Solid UI component relies on SolidJS context, and each component's context needs
        to be provided so that its sub-components can communicate.
      </p>
      <p>
        Because this is such a common pattern, Solid UI exports simple provider components which
        implement this pattern:
      </p>
      <CodeBlock>{example9}</CodeBlock>
      <h3>
        Provider components can use their own <Code>context</Code>!
      </h3>
      <p>
        Because we want every component (even provider components) to have access to the component
        context, if needed, Solid UI provider components are implemented so that every provider
        component takes in an optional <Code>context</Code> prop, which is a function that gets
        passed the component's context as a parameter. Think of it like a function <Code>ref</Code>{' '}
        or a render prop, where the function gives you access to the internal context so you can
        save it for later.
      </p>
      <CodeBlock>{example10}</CodeBlock>
    </section>
  );
}

Background.Link = () => <a href="#Background">Background</a>;

const example0 = `import Popover from '@solid-ui/popover';

const trigger = Popover.createTrigger();
const panel = Popover.createPanel();`;

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

const example7 = `import { PopoverStoreContext, createPopoverStore } from '@solid-ui/popover';

() => {
  const store = createPopoverStore();
  return (
    <PopoverStoreContext.Provider value={store}></PopoverStoreContext.Provider>
  );
}`;

const example9 = `function PopoverProvider(props) {
  const store = createPopoverStore();

  // An "IIFE" works here because SolidJS defers evaluating children until they are needed,
  // so "usePopoverContext" won't be called until the store context is available.
  // This anonymous function is only ever invoked once.
  return (
    <PopoverStoreContext.Provider value={store}>
      {(() => {
        props.context?.(usePopoverContext());
        return props.children;
      })()}
    </PopoverStoreContext.Provider>
  );
}

import Popover, { PopoverProvider } from '@solid-ui/popover';

<PopoverProvider></PopoverProvider> // creates the store and provides it via the component store context
<Popover></Popover> // the main function of the default export IS the "PopoverProvider"`;

const example10 = `import Popover from '@solid-ui/popover';

let context;
<Popover context={(ctx) => {
  context = ctx; // we now have access to the context object that Popover itself provides!
}}></Popover>`;

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
