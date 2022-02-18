import { Component, JSXElement, mergeProps, splitProps } from 'solid-js';
import { List, ListProps } from '~/List';
import ListProvider from '~/List/ListProvider';
import { BaseComponent, BaseComponentProps } from '~/types';
import Option from './Option';

export const RadioGroupProvider: Component = (props) => {
  return <ListProvider>{props.children}</ListProvider>;
};

type RadioGroupProps = {
  as?: string | BaseComponent<ListProps>;
  value?: any;
  onChange?: (value: any) => void;
};

export const RadioGroup: BaseComponent<RadioGroupProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);
  const [localProps, otherProps] = splitProps(props, ['as', 'value', 'onChange']);

  return (
    <ListProvider
      value={localProps.value}
      onChange={localProps.onChange}
      useRovingTabIndex
      isRadioList
    >
      <List {...otherProps} as={localProps.as} role="none">
        {props.children}
      </List>
    </ListProvider>
  );
};

type RadioGroupComponentType = {
  (props: BaseComponentProps<RadioGroupProps>): JSXElement;
  Option: typeof Option;
};

const RadioGroupComponent: RadioGroupComponentType = Object.assign(RadioGroup, {
  Option,
});

export default RadioGroupComponent;
