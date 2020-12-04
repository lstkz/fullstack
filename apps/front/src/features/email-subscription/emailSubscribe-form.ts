import { createForm } from 'typeless-form';
import { S } from 'schema';
import { SubscribeFormSymbol } from './symbol';
import { validate } from '../../common/helper';

export interface EmailSubscribeFormValues {
  email: string;
}

export const [
  useEmailSubscribeForm,
  EmailSubscribeFormActions,
  getEmailSubscribeFormState,
  EmailSubscribeFormProvider,
] = createForm<EmailSubscribeFormValues>({
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
