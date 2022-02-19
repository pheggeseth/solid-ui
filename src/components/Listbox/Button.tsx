import { useId } from '~/utils/componentUtils';
import { useListActions, useListState } from '~/components/List/context';
import { MenuButton } from '~/components/Menu';
import { ButtonProps } from '~/components/Menu/Button';
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
