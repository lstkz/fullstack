import React from 'react';
import { Validator } from 'src/common/Validator';
import { ContextFormInput } from './FormInput';

export interface UserInfoFormFields {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVat: string;
  address: string;
  postalCode: string;
  city: string;
}

interface UserInfoFormProps {}

export function validateUserInfoForm<T extends UserInfoFormFields>(
  validator: Validator<T>
) {
  validator
    .required('firstName')
    .required('lastName')
    .required('address')
    .required('postalCode')
    .required('city')
    .custom('companyName', data => {
      if (data.companyVat && !data.companyName) {
        return 'Pole wymagane jeśli NIP nie jest puste';
      }
      return null;
    })
    .custom('companyVat', data => {
      if (!data.companyVat && data.companyName) {
        return 'Pole wymagane jeśli Nazwa firmy nie jest puste';
      }
      return null;
    });
}

export function UserInfoForm(props: UserInfoFormProps) {
  return (
    <>
      <div className="grid lg:grid-cols-2 lg:gap-4">
        <ContextFormInput name="firstName" label="Imię" />
        <ContextFormInput name="lastName" label="Nazwisko" />
      </div>
      <ContextFormInput name="companyName" label="Nazwa firmy (opcjonalnie)" />
      <ContextFormInput name="companyVat" label="NIP (opcjonalnie)" />
      <ContextFormInput
        name="address"
        label="Adres"
        placeholder="Ulica, numer budyku i lokalu"
      />
      <div className="grid lg:grid-cols-2 lg:gap-4">
        <ContextFormInput
          name="postalCode"
          label="Kod pocztowy"
          placeholder="00-000"
        />
        <ContextFormInput name="city" label="Miasto" />
      </div>
    </>
  );
}
