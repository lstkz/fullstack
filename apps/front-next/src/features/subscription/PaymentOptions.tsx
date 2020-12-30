import * as React from 'react';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { TPayGroup } from 'shared';
import { api } from 'src/services/api';
import { useErrorModalActions } from '../ErrorModalModule';
import { useFormContext } from 'react-hook-form';
import { SubscriptionFormValues } from './SubscriptionPage';
import { InputFeedback } from 'src/components/Input';
import classNames from 'classnames';
import { HeadingNext } from 'src/components/HeadingNext';

export function PaymentOptions() {
  const {
    setValue,
    watch,
    errors,
    register,
  } = useFormContext<SubscriptionFormValues>();

  const groupId = watch('groupId');
  const errorModalActions = useErrorModalActions();
  const [tpayGroups, setTPayGroups] = React.useState<TPayGroup[] | null>(null);
  React.useEffect(() => {
    register('groupId');
  }, []);
  React.useEffect(() => {
    api
      .subscription_getTPayGroups()
      .then(setTPayGroups)
      .catch(errorModalActions.show);
  }, []);

  return (
    <div className="my-4" id="groupId">
      <HeadingNext className="mb-2" type={5} id="payment-options-label">
        Forma płatności
      </HeadingNext>
      {!tpayGroups ? (
        <div className="flex items-center justify-center">
          <SpinnerBoarder />
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-3 lg:grid-cols-4 gap-2"
            role="radiogroup"
            aria-labelledby="payment-options-label"
          >
            {tpayGroups.map(item => (
              <button
                type="button"
                key={item.id}
                role="radio"
                aria-checked={item.id === groupId}
                onClick={() =>
                  setValue('groupId', item.id, {
                    shouldValidate: true,
                  })
                }
                className={classNames(
                  'p-2 shadow-sm border rounded-md flex items-center justify-center bg-white cursor-pointer focus:ring focus:outline-none transition-shadow',
                  item.id === groupId ? 'border-primary' : 'border-gray-200'
                )}
                aria-label={item.name}
              >
                <img
                  role="presentation"
                  alt={item.name}
                  title={item.name}
                  src={item.img}
                  className="max-h-full max-w-full"
                />
              </button>
            ))}
          </div>
          {errors.groupId?.message && (
            <InputFeedback color="danger">
              {errors.groupId?.message}
            </InputFeedback>
          )}
        </>
      )}
    </div>
  );
}
