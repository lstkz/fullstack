import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Validator } from 'src/common/Validator';
import { Button } from 'src/components/Button';
import { ContextFormInput } from 'src/components/FormInput';
import { InputGroup } from 'src/components/InputGroup';
import { api } from 'src/services/api';
import { useErrorModalActions } from '../ErrorModalModule';

export interface PromoValues {
  code: string;
}

interface PromoFormProps {
  onPromoCode(code: string, discount: number): void;
}

export function PromoForm(props: PromoFormProps) {
  const { onPromoCode } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const errorModalActions = useErrorModalActions();

  const formMethods = useForm<PromoValues>({
    resolver: data => {
      return new Validator(data).required('code', 'Wpisz kod').validate();
    },
  });
  const { handleSubmit } = formMethods;
  const onSubmit = async (values: PromoValues) => {
    setIsSubmitting(true);
    try {
      const result = await api.subscription_checkPromoCode(values.code);
      if (result.type === 'invalid') {
        errorModalActions.show('Nieprawidłowy kod');
      } else {
        onPromoCode(values.code, result.discount);
      }
    } catch (e) {
      errorModalActions.show(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  const submitForm = handleSubmit(onSubmit);
  return (
    <FormProvider {...formMethods}>
      <div className="mt-4">
        <span className="text-gray-700 text-sm">Masz kod promocyjny?</span>
        <InputGroup
          size="small"
          input={
            <ContextFormInput
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  void submitForm();
                  e.preventDefault();
                }
              }}
              name="code"
              placeholder="Kod"
              noFeedback
            />
          }
          append={
            <Button loading={isSubmitting} onClick={submitForm} type="primary">
              Potwierdź
            </Button>
          }
        />
      </div>
    </FormProvider>
  );
}
