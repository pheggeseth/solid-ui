import { ListLabel } from '~/List';
import { LabelProps } from '~/List/Label';
import { BaseComponent } from '~/types';

export const Label: BaseComponent<LabelProps> = (props) => {
  return <ListLabel {...props} idPrefix="combobox-label" />;
};

export default Label;
