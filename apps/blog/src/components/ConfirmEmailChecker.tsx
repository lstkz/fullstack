import { useLocation } from '@reach/router';
import { replace } from 'gatsby';
import React from 'react';
import { parseQueryString } from '../helper';
import { api } from '../services/api';
import { EmailMessage } from './EmailMessage';
import { Modal } from './Modal';

export function ConfirmEmailChecker() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState({ title: '', content: '' });
  const location = useLocation();
  React.useEffect(() => {
    const qs = parseQueryString(location.search);
    if (qs['confirm-email']) {
      replace(location.pathname);
      const code = qs['confirm-email'];
      api
        .subscription_confirmSubscription(code)
        .toPromise()
        .then(() => {
          setIsOpen(true);
          setContent({
            title: 'Potwierdzono',
            content: 'Twój e-mail został potwierdzony 👏.',
          });
        })
        .catch(e => {
          console.error(e);
        });
    } else if (qs.unsubscribe && qs.email && qs.source) {
      replace(location.pathname);
      api
        .subscription_unsubscribe(qs.email, qs.unsubscribe, qs.source)
        .toPromise()
        .then(() => {
          setIsOpen(true);
          setContent({
            title: 'Unsubscribed',
            content: 'Twój e-mail został usunięty.',
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }, [location]);

  return (
    <Modal
      isOpen={isOpen}
      close={() => {
        setIsOpen(false);
      }}
      title={content.title}
      size="md"
    >
      <EmailMessage>{content.content}</EmailMessage>
    </Modal>
  );
}
