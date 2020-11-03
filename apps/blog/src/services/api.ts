import { APIClient } from 'shared';
import { getAccessToken } from './Storage';
import { API_URL } from '../config';

export const api = new APIClient(API_URL, getAccessToken);
