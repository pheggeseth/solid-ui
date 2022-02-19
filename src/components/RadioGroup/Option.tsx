import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { useListState } from '~/components/List/context';
import ListItem, { ItemProps } from '~/components/List/Item';
import { BaseComponent, BaseComponentProps } from '~/types';

type OptionProps = {
  as?:
    | string
    | BaseComponent<
        ItemProps & {
          'aria-describedby'?: string;
          'aria-labelledby'?: string;
        }
      >;
  value?: any;
};

const Option: BaseComponent<OptionProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);
  const ListState = useListState();

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <ListItem
      {...otherProps}
      as={localProps.as}
      aria-labelledby={ListState.labelId}
      dataAttribute="data-solid-radio-group-option"
      idPrefix="radio-group-option"
      role="radio"
    />
  );
};

type OptionComponentType = {
  (props: BaseComponentProps<OptionProps>): JSXElement;
  state: typeof ListItem.state;
};

const OptionComponent: OptionComponentType = Object.assign(Option, {
  state: ListItem.state,
});

export { OptionComponent as Option };

export default OptionComponent;
