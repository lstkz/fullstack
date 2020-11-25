import { createForm } from 'typeless-form';
import { S } from 'schema';
import { CheckoutFormSymbol } from './symbol';
import { validate } from '../../common/helper';

export interface CheckoutFormValues {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyVat: string;
  address: string;
  postalCode: string;
  city: string;
  agreeTerms: boolean;
  agreeNewsletter: boolean;
  groupId: number;
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
        email: S.string().email(),
        firstName: S.string(),
        lastName: S.string(),
        companyName: S.string().optional(),
        companyVat: S.string().optional(),
        address: S.string(),
        postalCode: S.string(),
        city: S.string(),
        groupId: S.number(),
        agreeTerms: S.boolean(),
        agreeNewsletter: S.boolean().optional(),
      })
    );

    if (values.companyName && !values.companyVat) {
      errors.companyVat = 'Pole wymagane jeśli Nazwa firmy nie jest puste';
    }
    if (values.companyVat && !values.companyName) {
      errors.companyName = 'Pole wymagane jeśli NIP nie jest puste';
    }
    if (errors.groupId) {
      errors.groupId = 'Wybierz formę płatności';
    }
  },
});
