import { JSXElement } from 'solid-js';
import { ListboxOption } from '~/components/Listbox';
import { BaseComponent, BaseComponentProps } from '~/types';

export type ComboboxOptionProps = {
  value: any;
};

const ComboboxOptionComponent: BaseComponent<ComboboxOptionProps> = (props) => {
  return <ListboxOption {...props} dataAttribute="data-solid-combobox-option" />;
};

type ComboboxOptionType = {
  (props: BaseComponentProps<ComboboxOptionProps>): JSXElement;
  state: typeof ListboxOption.state;
};

const ComboboxOption: ComboboxOptionType = Object.assign(ComboboxOptionComponent, {
  state: ListboxOption.state,
});

export default ComboboxOption;
