import { FieldError, ResolverResult } from 'react-hook-form';
import { safeKeys } from './helper';

export class Validator<T extends object> {
  errors: {
    [x in keyof T]?: string;
  } = {};

  constructor(private data: T) {}

  required(field: keyof T, message?: string) {
    const value: any = this.data[field];
    if (!this.errors[field] && (value == null || value == '')) {
      this.errors[field] = message ?? 'Pole wymagane';
    }
    return this;
  }

  custom(field: keyof T, fn: (data: T) => string | null) {
    if (!this.errors[field]) {
      const error = fn(this.data);
      if (error) {
        this.errors[field] = error;
      }
    }
    return this;
  }

  validate(): ResolverResult<T> {
    if (Object.keys(this.errors).length) {
      const mappedErrors: any = {};
      safeKeys(this.errors).map(key => {
        mappedErrors[key] = {
          type: 'validate',
          message: this.errors[key],
        } as FieldError;
      });
      return {
        values: {},
        errors: mappedErrors,
      };
    }
    return {
      errors: {},
      values: this.data as any,
    };
  }

  touch(fn: (validator: this) => void) {
    fn(this);
    return this;
  }
}
