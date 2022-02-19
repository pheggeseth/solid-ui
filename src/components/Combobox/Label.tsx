import { ListLabel } from '~/components/List';
import { LabelProps } from '~/components/List/Label';
import { BaseComponent } from '~/types';

export const Label: BaseComponent<LabelProps> = (props) => {
  return <ListLabel {...props} idPrefix="combobox-label" />;
};

export default Label;
