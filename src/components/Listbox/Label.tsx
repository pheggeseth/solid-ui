import ListLabel, { LabelProps } from '~/components/List/Label';
import { BaseComponent } from '~/types';

export const Label: BaseComponent<LabelProps> = (props) => {
  return <ListLabel {...props} idPrefix="listbox-label" />;
};

export default Label;
