import { mergeProps, splitProps } from 'solid-js';
import { useListState } from '~/oldComponents/List/context';
import ListItem, { ItemProps, ListItemContext } from '~/oldComponents/List/Item';
import { BaseComponent, BaseComponentProps } from '~/types';

export type RadioOptionContext<T> = ListItemContext<T>;

type OptionProps<T> = ItemProps<T> & {
  as?:
    | string
    | BaseComponent<
        ItemProps<T> & {
          'aria-describedby'?: string;
          'aria-labelledby'?: string;
        }
      >;
  value?: T;
};

function Option<T = any>(props: BaseComponentProps<OptionProps<T>>) {
  props = mergeProps({ as: 'div' }, props);
  const ListState = useListState();

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <ListItem<T>
      {...otherProps}
      as={localProps.as}
      aria-labelledby={ListState.labelId}
      dataAttribute="data-solid-radio-group-option"
      idPrefix="radio-group-option"
      role="radio"
    />
  );
}

export default Option;
