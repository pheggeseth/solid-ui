import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent } from '~/types';
import { createLabelProps } from './Label';
import {
  createListItemProps,
  createListProps,
  ListItemProps,
  ListProps,
  ListProvider,
  ListProviderProps,
} from './List';

export type ListboxProviderProps<ItemValue> = ListProviderProps<ItemValue>;

export function ListboxProvider<ItemValue = any>(props: ListboxProviderProps<ItemValue>) {
  return <ListProvider {...props}>{props.children}</ListProvider>;
}

type ListboxLabelProps = BaseComponentProps<{
  component?: DynamicComponent<{
    id: string;
  }>;
  idPrefix?: string;
}>;

export function ListboxLabel(props: ListboxLabelProps) {
  props = mergeProps<typeof props[]>(
    { component: 'span', idPrefix: 'solid-ui-listbox-label' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const labelProps = createLabelProps({ idPrefix: localProps.idPrefix });

  return (
    <Dynamic
      {...otherProps}
      {...labelProps}
      component={localProps.component}
      data-solid-ui-listbox-label=""
    />
  );
}

type ListboxProps<ListboxElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<ListProps<ListboxElement> & { role: string }>;
  idPrefix?: string;
  role?: string;
}>;

export function Listbox<ItemValue, ListboxElement extends HTMLElement = HTMLUListElement>(
  props: ListboxProps<ListboxElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-listbox', role: 'listbox' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'role']);

  const listProps = createListProps<ItemValue, ListboxElement>({ idPrefix: localProps.idPrefix });

  return (
    <Dynamic
      {...otherProps}
      {...listProps}
      component={localProps.component}
      data-solid-ui-listbox=""
      role={localProps.role}
    />
  );
}

export type ListboxItemProps<
  ItemValue,
  ListboxItemElement extends HTMLElement
> = BaseComponentProps<{
  component?: DynamicComponent<ListItemProps<ListboxItemElement> & { role: string }>;
  idPrefix?: string;
  role?: string;
  value?: ItemValue;
}>;

export function ListboxItem<ItemValue, ListboxItemElement extends HTMLElement = HTMLLIElement>(
  props: ListboxItemProps<ItemValue, ListboxItemElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'li', idPrefix: 'solid-ui-listbox-item', role: 'option' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'role', 'value']);

  const listItemProps = createListItemProps({
    idPrefix: localProps.idPrefix,
    value: localProps.value,
  });

  return (
    <Dynamic
      {...otherProps}
      {...listItemProps}
      data-solid-ui-listbox-item=""
      component={localProps.component}
      role={localProps.role}
    />
  );
}
