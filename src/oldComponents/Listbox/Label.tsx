import ListLabel, { LabelProps } from '~/oldComponents/List/Label';
import { BaseComponent } from '~/types';

export const Label: BaseComponent<LabelProps> = (props) => {
  return <ListLabel {...props} idPrefix="listbox-label" />;
};

export default Label;
