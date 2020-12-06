import { S } from 'schema';

export const getPasswordSchema = () => S.string().min(5);

export const EMAIL_REGEX = /^[a-zA-Z0-9._\-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
