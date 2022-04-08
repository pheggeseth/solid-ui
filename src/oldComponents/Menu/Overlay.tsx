import { PopoverOverlay } from '~/oldComponents/Popover';
import { OverlayProps } from '~/oldComponents/Popover/Overlay';
import { BaseComponent } from '~/types';

const Overlay: BaseComponent<Omit<OverlayProps, 'dataAttribute'>> = (props) => {
  return <PopoverOverlay {...props} dataAttribute="data-solid-menu-overlay" />;
};

export default Overlay;
