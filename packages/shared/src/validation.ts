import { S } from 'schema';

export const PASSWORD_MIN_LENGTH = 5;
export const getPasswordSchema = () => S.string().min(PASSWORD_MIN_LENGTH);

export const EMAIL_REGEX = /^[a-zA-Z0-9._\-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
