import React from 'react';
import { Heading } from 'src/components/Heading';
import { SettingsPageTemplate } from './SettingsPageTemplate';
import { ListGroup, ListGroupItem } from 'src/components/ListGroup';
import { NotificationSettings } from 'shared';
import { FormProvider, useForm } from 'react-hook-form';
import { useFormSubmitState } from 'src/hooks/useFormSubmitState';
import { FormSwitch } from 'src/components/FormSwitch';
import { api } from 'src/services/api';

interface NotificationsPageProps {
  settings: NotificationSettings;
}

interface NotificationFormValues extends NotificationSettings {}

export function NotificationsPage(props: NotificationsPageProps) {
  const formMethods = useForm<NotificationFormValues>({
    defaultValues: props.settings,
  });
  const { handleSubmit } = formMethods;
  const { onSubmit, submitButton } = useFormSubmitState(
    async (values: NotificationFormValues) => {
      await api.user_updateNotificationSettings(values);
    }
  );

  return (
    <SettingsPageTemplate>
      <Heading type={5} className="mb-4">
        Powiadomienia email
      </Heading>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListGroup className="mb-4">
            <ListGroupItem
              title={<Heading type={5}>Newsletter</Heading>}
              desc="Będziesz dostawać informacje o promocjach i newsach dotyczących
            platformy."
              right={<FormSwitch name="newsletter" aria-label="newsletter" />}
            />
            <ListGroupItem
              title={<Heading type={5}>Nowe materiały</Heading>}
              desc="Będziesz dostawać informacje o nowych modułach i zadaniach do zrobienia."
              right={
                <FormSwitch name="newContent" aria-label="Nowe materiały" />
              }
            />
            <ListGroupItem
              title={<Heading type={5}>Webinary</Heading>}
              desc="Będziesz dostawać informacje o nowych webinarach."
              right={<FormSwitch name="webinars" aria-label="Webinary" />}
            />
            <ListGroupItem
              title={<Heading type={5}>Kończący się abonament</Heading>}
              desc="Będziesz dostawać informacje o kończącym się abonamencie."
              right={
                <FormSwitch
                  name="subscriptionRemainder"
                  aria-label="Kończący się abonament"
                />
              }
            />
          </ListGroup>
          {submitButton}
        </form>
      </FormProvider>
    </SettingsPageTemplate>
  );
}
