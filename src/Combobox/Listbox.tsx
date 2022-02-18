import { ListboxOptions } from '~/Listbox';
import { OptionsProps } from '~/Listbox/Options';
import { BaseComponent } from '~/types';

const ComboboxListbox: BaseComponent<Omit<OptionsProps, 'dataAttribute'>> = (
  props: OptionsProps
) => {
  return (
    <ListboxOptions
      {...props}
      dataAttribute="data-solid-combobox-listbox"
      dataAttributePanel="data-solid-combobox-panel"
    />
  );
};

export default ComboboxListbox;
