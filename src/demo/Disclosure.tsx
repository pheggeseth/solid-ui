import { ComponentProps, mergeProps, PropsWithChildren } from 'solid-js';
import Disclosure from '../components/Disclosure';

function DisclosureTrigger(props: ComponentProps<'button'>) {
  const { props: triggerProps, effects } = Disclosure.createTrigger();

  effects();

  const finalProps = mergeProps(props, triggerProps);

  return <button {...finalProps}>{props.children}</button>;
}

function DisclosureContent(props: ComponentProps<'div'>) {
  const { props: contentProps, effects, context } = Disclosure.createContent();

  effects();

  const finalProps = mergeProps(props, contentProps);

  return (
    <div {...finalProps} style={{ display: context.isShowingContent() ? 'block' : 'none' }}>
      {props.children}
    </div>
  );
}

export function DisclosureExample() {
  return (
    <Disclosure>
      <DisclosureTrigger>Disclosure</DisclosureTrigger>
      <DisclosureContent>This is the disclosure content.</DisclosureContent>
    </Disclosure>
  );
}
