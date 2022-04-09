import { Code, CodeBlock } from './utils';

export function Styling() {
  return (
    <section>
      <h2 id="Styling">Styling</h2>
      <p>
        As Solid UI provides hooks for creating components, and not components themselves, Solid UI
        components are "unstyled" and only include the styles that you add. Solid UI includes
        separate component hooks for each part of a component, so styles can easily and
        declaratively be applied to every part of the component.
      </p>
      <h3>Data attributes</h3>
      <p>
        Each Solid UI component does include a unique <Code language="html">[data-solid-ui-*]</Code>{' '}
        attribute that can be used to apply styles with CSS:
      </p>
      <CodeBlock language="css">{example1}</CodeBlock>
      <p>
        If you would like to override these data attributed and supply your own, every component
        hook includes an optional <Code>isPrefix</Code> property:
      </p>
      <CodeBlock>{example2}</CodeBlock>
      <p>
        Some generic data attributes are also added for elements that are common among many Solid UI
        components, such as <Code language="html">[data-solid-ui-button]</Code> for buttons.
        Providing styles for this attribute will apply the same styling to all Solid UI components
        that are intended to be buttons:
      </p>
      <CodeBlock language="css">{example3}</CodeBlock>
      <h3>Default Styles</h3>
      <p>
        As a starting point, Solid UI also comes with a set of default styles (like the ones on this
        page), which can be added by importing <Code>styles.css</Code>:
      </p>
      <CodeBlock>import '@solid-ui/styles.css';</CodeBlock>
      <p>
        All default styles rely on Solid UI's default data attributes and use the lowest specificity
        possible, so they are easy to override.
      </p>
    </section>
  );
}

Styling.Link = () => (
  <li>
    <a href="#Styling">Styling</a>
  </li>
);

const example1 = `[data-solid-ui-popover-trigger] {
  background: red;
}

[data-solid-ui-popover-trigger]:hover {
  background: blue;
}`;

const example2 = `const { props } = Popover.createTrigger({ idPrefix: 'my-trigger' });
// trigger data attribute is now "data-my-trigger"`;

const example3 = `[data-solid-ui-button]:hover {
  background: green;
}`;
