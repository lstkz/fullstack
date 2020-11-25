import { createForm } from 'typeless-form';
import { S } from 'schema';
import { CheckoutFormSymbol } from './symbol';
import { validate } from '../../common/helper';

export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVat: string;
  address: string;
  postalCode: string;
  city: string;
  agreeTerms: boolean;
  agreeNewsletter: boolean;
}

export const [
  useCheckoutForm,
  CheckoutFormActions,
  getCheckoutFormState,
  CheckoutFormProvider,
] = createForm<CheckoutFormValues>({
  symbol: CheckoutFormSymbol,
  validator: (errors, values) => {
    validate(
      errors,
      values,
      S.object().keys({
        firstName: S.string(),
        lastName: S.string(),
        companyName: S.string().optional(),
        companyVat: S.string().optional(),
        address: S.string(),
        postalCode: S.string(),
        city: S.string(),
        agreeTerms: S.boolean(),
        agreeNewsletter: S.boolean().optional(),
      })
    );
  },
});
