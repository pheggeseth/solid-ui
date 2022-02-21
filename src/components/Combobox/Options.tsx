import { ListboxOptions } from '~/components/Listbox';
import { OptionsProps } from '~/components/Listbox/Options';
import { BaseComponent } from '~/types';

const ComboboxOptions: BaseComponent<Omit<OptionsProps, 'dataAttribute'>> = (
  props: OptionsProps
) => {
  return (
    <ListboxOptions
      {...props}
      dataAttribute="data-solid-combobox-options"
      dataAttributePanel="data-solid-combobox-panel"
    />
  );
};

export default ComboboxOptions;
