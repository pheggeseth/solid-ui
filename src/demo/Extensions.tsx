import { Code, CodeBlock } from './utils';

export function Extensions() {
  return (
    <section>
      <h2 id="Extensions">Extensions</h2>
      <p>
        By default, Solid UI makes no assumptions as to how you want to do things like position a
        popover near an anchor point. As <a href="https://popper.js.org/">PopperJS</a> is a popular
        positioning library, Solid UI comes with a built-in <Code>Popper</Code> component:
      </p>
      <CodeBlock>{example1}</CodeBlock>
    </section>
  );
}

Extensions.Link = () => (
  <li>
    <a href="#Extensions">Extensions</a>
  </li>
);

const example1 = `import Popper from '@solid-ui/popper';

function MyPopover() {
  return (
    <Popper>
      <MyTrigger ref={Popper.AnchorRef} />
      <MyPopover ref={Popper.PopperRef} />
    </Popper>
  )
}`;
