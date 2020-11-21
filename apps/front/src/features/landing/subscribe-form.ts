import { createForm } from 'typeless-form';
import { S } from 'schema';
import { SubscribeFormSymbol } from './symbol';
import { validate } from '../../common/helper';

export interface SubscribeFormValues {
  email: string;
}

export const [
  useSubscribeForm,
  SubscribeFormActions,
  getSubscribeFormState,
  SubscribeFormProvider,
] = createForm<SubscribeFormValues>({
  symbol: SubscribeFormSymbol,
  validator: (errors, values) => {
    validate(
      errors,
      values,
      S.object().keys({
        email: S.string().email(),
      })
    );
  },
});
