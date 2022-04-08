import { createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
import FormComponent, {
  CreateFormConfig,
  FormContextProp,
  useFormContext,
} from '../components/Form';

export function Form(props: PropsWithChildren<CreateFormConfig & FormContextProp>) {
  return (
    <FormComponent>
      {(() => {
        const { props: formProps } = FormComponent.createForm(props);
        props.context?.(useFormContext());
        return <form {...formProps}>{props.children}</form>;
      })()}
    </FormComponent>
  );
}

export function FormControl(props: PropsWithChildren) {
  return (
    <FormComponent.Control>
      {(() => {
        const { props: formControlProps } = FormComponent.Control.createControl();
        return <div {...formControlProps}>{props.children}</div>;
      })()}
    </FormComponent.Control>
  );
}

export function Label(props: PropsWithChildren) {
  const { props: labelProps, effects } = FormComponent.Control.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

export function Input(props: PropsWithChildren<{ name: string }>) {
  const {
    props: fieldProps,
    effects,
    validate,
    touch,
  } = FormComponent.Control.createField({
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
  const { props: helperTextProps, effects } = FormComponent.Control.createHelperText();

  effects();

  return <div {...helperTextProps}>{props.children}</div>;
}

export function ErrorMessage() {
  const { props: errorMessageProps, effects, context } = FormComponent.Control.createErrorMessage();

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
  const { props: submitProps, context } = FormComponent.createSubmit();
  return <button {...submitProps}>{context.isSubmitting() ? 'Submitting...' : 'Submit'}</button>;
}

export function FormExample() {
  return (
    <Form
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
    </Form>
  );
}
