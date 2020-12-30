import * as React from 'react';
import { FullPageForm } from 'src/components/FullPageForm';
import { MailSuccessIcon } from 'src/icons/MailSuccessIcon';

export function PasswordResetSuccess() {
  return (
    <FullPageForm testId="reset-password-success" title="Resetuj Hasło">
      <div className="rounded-lg bg-success text-center text-white px-14 pt-4 pb-8">
        <div className="mb-3 flex items-center justify-center">
          <MailSuccessIcon />
        </div>
        Wiadomość z linkiem do resetowania hasła została wysłana na Twój adres
        e-mail.
      </div>
    </FullPageForm>
  );
}
