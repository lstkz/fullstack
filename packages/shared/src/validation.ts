import { S } from 'schema';

export const PASSWORD_MIN_LENGTH = 5;
export const getPasswordSchema = () => S.string().min(PASSWORD_MIN_LENGTH);

export const EMAIL_REGEX = /^[a-zA-Z0-9._\-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const getCustomerSchema = () =>
  S.object().keys({
    firstName: S.string(),
    lastName: S.string(),
    companyName: S.string().optional(),
    companyVat: S.string().optional(),
    address: S.string(),
    postalCode: S.string(),
    city: S.string(),
  });
