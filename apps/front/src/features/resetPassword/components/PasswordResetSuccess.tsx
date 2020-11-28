import * as React from 'react';
import styled from 'styled-components';
import { FullPageForm } from 'src/new-components/FullPageForm';
import { MailSuccessIcon } from 'src/icons/MailSuccessIcon';
import { NewTheme } from 'src/NewTheme';

const Content = styled.div`
  border-radius: 5px;
  background: ${NewTheme.success};
  text-align: center;
  padding: 15px 45px 30px;
  color: white;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export function PasswordResetSuccess() {
  return (
    <FullPageForm testId="reset-password-success" title="Resetuj Hasło">
      <Content>
        <Icon>
          <MailSuccessIcon />
        </Icon>
        Wiadomość z linkiem do resetowania hasła została wysłana na Twój adres
        e-mail.
      </Content>
    </FullPageForm>
  );
}
