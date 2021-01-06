import React from 'react';
import { UserInfoFormFields } from 'src/components/UserInfoForm';
import { EmailSection } from './EmailSection';
import { PasswordSection } from './PasswordSection';
import { SettingsPageTemplate } from './SettingsPageTemplate';
import { UserInfoSection } from './UserInfoSection';

interface SettingsPageProps {
  info: UserInfoFormFields;
}

export function SettingsPage(props: SettingsPageProps) {
  const { info } = props;
  return (
    <SettingsPageTemplate>
      <UserInfoSection info={info} />
      <EmailSection />
      <PasswordSection />
    </SettingsPageTemplate>
  );
}
