import { Accessor } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlSelectors } from './context';

export type CreateFormControlSubmitConfig = {
  idPrefix?: string;
  isDisabled?: Accessor<boolean>;
};

export function createSubmit(config: CreateFormControlSubmitConfig) {
  const props = createSubmitProps(config);

  return {
    props,
  };
}

export function createSubmitProps(config: CreateFormControlSubmitConfig) {
  const { idPrefix = 'solid-ui-form-control-submit' } = config;
  const id = useId(idPrefix);
  const selectors = useFormControlSelectors();

  return {
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    get disabled() {
      return config.isDisabled ? config.isDisabled() : selectors.isDisabled();
    },
    id,
    type: 'submit',
  } as const;
}
