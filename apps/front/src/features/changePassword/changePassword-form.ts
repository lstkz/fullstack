import { createForm } from 'typeless-form';
import { S } from 'schema';
import { ChangePasswordFormSymbol } from './symbol';
import { validate } from '../../common/helper';
import { getPasswordSchema } from 'shared';

export interface ChangePasswordFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const [
  useChangePasswordForm,
  ChangePasswordFormActions,
  getChangePasswordFormState,
  ChangePasswordFormProvider,
] = createForm<ChangePasswordFormValues>({
  symbol: ChangePasswordFormSymbol,
  validator: (errors, values) => {
    validate(
      errors,
      values,
      S.object().keys({
        password: getPasswordSchema(),
        confirmPassword: S.string(),
      })
    );
    if (
      !errors.password &&
      !errors.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = 'Hasła się nie zgadzają';
    }
  },
});
