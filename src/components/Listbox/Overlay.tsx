import { PopoverOverlay } from '~/components/Popover';
import { OverlayProps } from '~/components/Popover/Overlay';
import { BaseComponent } from '~/types';

const Overlay: BaseComponent<Omit<OverlayProps, 'dataAttribute'>> = (props) => {
  return <PopoverOverlay {...props} dataAttribute="data-solid-listbox-overlay" />;
};

export default Overlay;
