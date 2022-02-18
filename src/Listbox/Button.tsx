import { useId } from '~/componentUtils';
import { useListActions, useListState } from '~/List/context';
import { MenuButton } from '~/Menu';
import { ButtonProps } from '~/Menu/Button';
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
