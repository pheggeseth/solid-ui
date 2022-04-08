import { useId } from '~/utils/componentUtils';
import { useListActions, useListState } from '~/oldComponents/List/context';
import { MenuButton } from '~/oldComponents/Menu';
import { ButtonProps } from '~/oldComponents/Menu/Button';
import { BaseComponent } from '~/types';

export const Button: BaseComponent<Omit<ButtonProps, 'dataAttribute'>> = function Button(props) {
  const ListState = useListState();
  const ListActions = useListActions();

  const buttonId = useId('listbox-button');

  ListActions.registerLabel(buttonId, 'Button');

  return (
    <MenuButton
      {...props}
      aria-labelledby={ListState.labelId}
      dataAttribute="data-solid-listbox-button"
      idPrefix={props.idPrefix || 'listbox-button'}
    />
  );
};

export default Button;
