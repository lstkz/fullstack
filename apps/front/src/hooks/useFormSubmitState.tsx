import React from 'react';
import { Button } from 'src/components/Button';
import { useErrorModalActions } from 'src/features/ErrorModalModule';

export function useFormSubmitState<T>(fn: (values: T) => Promise<any> | any) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const errorModalActions = useErrorModalActions();

  React.useEffect(() => {
    if (!isSaved) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSaved]);

  return {
    submitButton: (
      <Button
        disabled={isSaved || isSubmitting}
        type={isSaved ? 'success' : 'primary'}
        htmlType="submit"
        size="small"
      >
        {isSaved ? 'Zapisano!' : 'Zapisz'}
      </Button>
    ),
    isSubmitting,
    isSaved,
    onSubmit: async (values: T) => {
      setIsSubmitting(true);
      try {
        await fn(values);
        setIsSaved(true);
      } catch (e) {
        errorModalActions.show(e);
      } finally {
        setIsSubmitting(false);
      }
    },
  };
}
