import { ListLabel } from '~/oldComponents/List';
import { LabelProps } from '~/oldComponents/List/Label';
import { BaseComponent } from '~/types';

export const Label: BaseComponent<LabelProps> = (props) => {
  return <ListLabel {...props} idPrefix="combobox-label" />;
};

export default Label;
