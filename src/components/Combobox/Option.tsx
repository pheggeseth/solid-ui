import { ListboxOption } from '~/components/Listbox';
import { BaseComponentProps } from '~/types';

export type ComboboxOptionProps = {
  value: string;
};

function Option(props: BaseComponentProps<ComboboxOptionProps>) {
  return <ListboxOption<string> {...props} dataAttribute="data-solid-combobox-option" />;
}

export default Option;
