import { createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
import Form, { CreateFormConfig, FormContextProp, useFormContext } from '../../components/Form';
import { Code, CodeBlock } from '../utils';

export function FormRoot(props: PropsWithChildren<CreateFormConfig & FormContextProp>) {
  return (
    <Form>
      {(() => {
        const { props: formProps } = Form.createForm(props);
        props.context?.(useFormContext());
        return <form {...formProps}>{props.children}</form>;
      })()}
    </Form>
  );
}

export function FormControl(props: PropsWithChildren) {
  return (
    <Form.Control>
      {(() => {
        const { props: formControlProps } = Form.Control.createControl();
        return <div {...formControlProps}>{props.children}</div>;
      })()}
    </Form.Control>
  );
}

export function Label(props: PropsWithChildren) {
  const { props: labelProps, effects } = Form.Control.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

export function Input(props: PropsWithChildren<{ name: string }>) {
  const {
    props: fieldProps,
    effects,
    validate,
    touch,
  } = Form.Control.createField({
    name: props.name,
    initialValue: '',
    validators: [
      (value) => value.length < 5 && 'Value must be at least 5 characters long.',
      (value) => !value.includes('a') && 'Value must include the character "a".',
    ],
  });

  effects();

  const [value, setValue] = createSignal('');

  const handleBlur = () => {
    touch();
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value);
    validate(value());
  };

  return (
    <input
      type="text"
      {...fieldProps}
      data-solid-ui-input=""
      value={value()}
      onBlur={handleBlur}
      onInput={handleInput}
    />
  );
}

export function HelperText(props: PropsWithChildren) {
  const { props: helperTextProps, effects } = Form.Control.createHelperText();

  effects();

  return <div {...helperTextProps}>{props.children}</div>;
}

export function ErrorMessage() {
  const { props: errorMessageProps, effects, context } = Form.Control.createErrorMessage();

  effects();

  return (
    <Show when={context.isTouched() && context.isInvalid()}>
      <div {...errorMessageProps}>
        <For each={context.errors()}>{(errorMessage) => <div>{errorMessage}</div>}</For>
      </div>
    </Show>
  );
}

function FormSubmit() {
  const { props: submitProps, context } = Form.createSubmit();
  return <button {...submitProps}>{context.isSubmitting() ? 'Submitting...' : 'Submit'}</button>;
}

function MyForm() {
  return (
    <FormRoot
      onSubmit={(event, onSubmitEnd) => {
        event.preventDefault();
        setTimeout(onSubmitEnd, 1000);
      }}
    >
      <FormControl>
        <Label>Field 1</Label>
        <Input name="field1" />
        <HelperText>This is the helper text.</HelperText>
        <ErrorMessage />
      </FormControl>
      <FormSubmit />
    </FormRoot>
  );
}

export function FormDemo() {
  return (
    <section>
      <h2 id="Form">Form</h2>
      <p>
        Solid UI's form component hooks allow you to easily and declaratively validate forms. The{' '}
        <Code>createField()</Code> hook takes in the field <Code>name</Code>,{' '}
        <Code>initialValue</Code>, and an optional array of <Code>validators</Code>. In addition to
        the normal "props, effects, context" returned from Solid UI component hooks,{' '}
        <Code>createField()</Code> also returns <Code>validate()</Code> and <Code>touch().</Code>{' '}
        Call <Code>validate()</Code> whenever you want the value of your field to re-validate, and
        call <Code>touch()</Code> whenever you consider the field to have been visited by the user.
      </p>
      <p>
        If none of the fields in the form have errors, then the submit button created by{' '}
        <Code>createSubmit()</Code> will be enabled. Clicking it calls the <Code>onSubmit()</Code>{' '}
        handler supplied to the <Code>createForm()</Code> hook. When you're done, call the{' '}
        <Code>onSubmitEnd()</Code> callback provided to <Code>onSubmit()</Code> as the second
        argument to toggle the form's submitting state to false.
      </p>
      <h3>Example</h3>
      <MyForm />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

FormDemo.Link = () => <a href="#Form">Form</a>;

const exampleCode = `import { createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
import Form, { CreateFormConfig, FormContextProp, useFormContext } from '@solid-ui/form';

export function FormRoot(props: PropsWithChildren<CreateFormConfig & FormContextProp>) {
  return (
    <Form>
      {(() => {
        const { props: formProps } = Form.createForm(props);
        props.context?.(useFormContext());
        return <form {...formProps}>{props.children}</form>;
      })()}
    </Form>
  );
}

export function FormControl(props: PropsWithChildren) {
  return (
    <Form.Control>
      {(() => {
        const { props: formControlProps } = Form.Control.createControl();
        return <div {...formControlProps}>{props.children}</div>;
      })()}
    </Form.Control>
  );
}

export function Label(props: PropsWithChildren) {
  const { props: labelProps, effects } = Form.Control.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

export function Input(props: PropsWithChildren<{ name: string }>) {
  const {
    props: fieldProps,
    effects,
    validate,
    touch,
  } = Form.Control.createField({
    name: props.name,
    initialValue: '',
    validators: [
      (value) => value.length < 5 && 'Value must be at least 5 characters long.',
      (value) => !value.includes('a') && 'Value must include the character "a".',
    ],
  });

  effects();

  const [value, setValue] = createSignal('');

  const handleBlur = () => {
    touch();
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value);
    validate(value());
  };

  return (
    <input
      type="text"
      {...fieldProps}
      data-solid-ui-input=""
      value={value()}
      onBlur={handleBlur}
      onInput={handleInput}
    />
  );
}

export function HelperText(props: PropsWithChildren) {
  const { props: helperTextProps, effects } = Form.Control.createHelperText();

  effects();

  return <div {...helperTextProps}>{props.children}</div>;
}

export function ErrorMessage() {
  const { props: errorMessageProps, effects, context } = Form.Control.createErrorMessage();

  effects();

  return (
    <Show when={context.isTouched() && context.isInvalid()}>
      <div {...errorMessageProps}>
        <For each={context.errors()}>{(errorMessage) => <div>{errorMessage}</div>}</For>
      </div>
    </Show>
  );
}

function FormSubmit() {
  const { props: submitProps, context } = Form.createSubmit();
  return <button {...submitProps}>{context.isSubmitting() ? 'Submitting...' : 'Submit'}</button>;
}

function MyForm() {
  return (
    <FormRoot
      onSubmit={(event, onSubmitEnd) => {
        event.preventDefault();
        setTimeout(onSubmitEnd, 1000);
      }}
    >
      <FormControl>
        <Label>Field 1</Label>
        <Input name="field1" />
        <HelperText>This is the helper text.</HelperText>
        <ErrorMessage />
      </FormControl>
      <FormSubmit />
    </FormRoot>
  );
}`;
