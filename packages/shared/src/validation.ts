import { S } from 'schema';

export const getPasswordSchema = () => S.string().min(5);
