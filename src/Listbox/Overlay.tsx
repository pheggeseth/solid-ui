import { PopoverOverlay } from '~/Popover';
import { OverlayProps } from '~/Popover/Overlay';
import { BaseComponent } from '~/types';

const Overlay: BaseComponent<Omit<OverlayProps, 'dataAttribute'>> = (props) => {
  return <PopoverOverlay {...props} dataAttribute="data-solid-listbox-overlay" />;
};

export default Overlay;
