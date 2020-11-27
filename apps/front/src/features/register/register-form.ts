import { createForm } from 'typeless-form';
import { S } from 'schema';
import { RegisterFormSymbol } from './symbol';
import { validate } from '../../common/helper';
import { getPasswordSchema } from 'shared';

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const [
  useRegisterForm,
  RegisterFormActions,
  getRegisterFormState,
  RegisterFormProvider,
] = createForm<RegisterFormValues>({
  symbol: RegisterFormSymbol,
  validator: (errors, values) => {
    validate(
      errors,
      values,
      S.object().keys({
        email: S.string().email(),
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
