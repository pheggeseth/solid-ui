import Popover, { PopoverContextMemo } from '~/components/Popover';

export default function PopoverDemo() {
  let outerContext: PopoverContextMemo;
  let innerContext: PopoverContextMemo;

  return (
    <section>
      <h2>Popover</h2>
      <Popover context={(ctx) => (outerContext = ctx)}>
        <Popover.Trigger>{outerContext().isOpen ? 'Close' : 'Open'}</Popover.Trigger>
        <Popover.Overlay />
        <Popover.Panel>
          <Popover.Trigger>X</Popover.Trigger>
          <button>1</button>
          <Popover context={(ctx) => (innerContext = ctx)}>
            <button ref={Popover.AnchorRef}>2</button>
            <button>3</button>
            <Popover.Trigger>{innerContext().isOpen ? 'Close' : 'Open'}</Popover.Trigger>
            <Popover.Overlay />
            <Popover.Panel>
              <button>1</button>
              <button>2</button>
              <button>3</button>
            </Popover.Panel>
          </Popover>
        </Popover.Panel>
      </Popover>
    </section>
  );
}
