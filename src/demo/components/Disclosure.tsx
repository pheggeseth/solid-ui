import { Component } from 'solid-js';
import Disclosure from '../../components/Disclosure';
import { CodeBlock } from '../utils';

const DisclosureTrigger: Component = (props) => {
  const { props: triggerProps, effects } = Disclosure.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
};

const DisclosureContent: Component = (props) => {
  const { props: contentProps, effects, context } = Disclosure.createContent();

  effects();

  return (
    <div {...contentProps} style={{ display: context.isShowingContent() ? 'block' : 'none' }}>
      {props.children}
    </div>
  );
};

const DisclosureExample = () => {
  return (
    <Disclosure>
      <DisclosureTrigger>Disclosure</DisclosureTrigger>
      <DisclosureContent>This is the disclosure content.</DisclosureContent>
    </Disclosure>
  );
};

export function DisclosureDemo() {
  return (
    <section>
      <h2 id="Disclosure">Disclosure</h2>
      <p>
        A disclosure is a simple pattern for showing and hiding content. It differs from a popover
        in that the content should appear in the flow of the document, and not as a floating panel.
      </p>
      <h3>Example</h3>
      <DisclosureExample />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

DisclosureDemo.Link = () => <a href="#Disclosure">Disclosure</a>;

const exampleCode = `import { Component } from 'solid-js';
import Disclosure from '@solid-ui/disclosure';

const DisclosureTrigger: Component = (props) => {
  const { props: triggerProps, effects } = Disclosure.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
};

const DisclosureContent: Component = (props) => {
  const { props: contentProps, effects, context } = Disclosure.createContent();

  effects();

  return (
    <div {...contentProps} style={{ display: context.isShowingContent() ? 'block' : 'none' }}>
      {props.children}
    </div>
  );
};

const DisclosureExample = () => {
  return (
    <Disclosure>
      <DisclosureTrigger>Disclosure</DisclosureTrigger>
      <DisclosureContent>This is the disclosure content.</DisclosureContent>
    </Disclosure>
  );
};`;
