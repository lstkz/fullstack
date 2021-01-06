import React from 'react';
import { SettingsPageTemplate } from './SettingsPageTemplate';
import { UserInfoSection } from './UserInfoSection';

interface SettingsPageProps {}

export function SettingsPage(props: SettingsPageProps) {
  return (
    <SettingsPageTemplate>
      <UserInfoSection />
    </SettingsPageTemplate>
  );
}
