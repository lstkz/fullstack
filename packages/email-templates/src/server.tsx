import http from 'http';
import { render } from 'mjml-react';
import React from 'react';
import { ButtonActionTemplate } from './templates/ButtonActionTemplate';
import { MultiLinksTemplate } from './templates/MultiLinksTemplate';

const templates = {
  action: (
    <ButtonActionTemplate
      unsubscribeLink="https://example.org/unsubscribe"
      header="Już prawie gotowe"
      description="Jeszcze jeden ostatni krok – prosimy o potwierdzenie Twojego maila."
      buttonText="Potwierdź"
      buttonUrl="https://example.org/confirm"
    />
  ),
  actionNoSub: (
    <ButtonActionTemplate
      header="Już prawie gotowe"
      description="Jeszcze jeden ostatni krok – prosimy o potwierdzenie Twojego maila."
      buttonText="Potwierdź"
      buttonUrl="https://example.org/confirm"
    />
  ),
  multiLinks: (
    <MultiLinksTemplate
      header="Kupiłeś wiele dostępów do platformy"
      description="Dziękujemy za zakup kursu. Poniżej znajdziesz listę linków do założenia kont:"
      links={[
        'https://exmple.org/link1',
        'https://exmple.org/link2',
        'https://exmple.org/link3',
        'https://exmple.org/link4345',
      ]}
    />
  ),
};

const server = http.createServer(async (req, res) => {
  const name = req.url!.substr(1);
  const template = templates[name as keyof typeof templates];
  if (!template) {
    res.setHeader('content-type', 'text/html');
    res.write('Invalid template name');
    res.end();
    return;
  }

  const { html, errors } = render(template);
  if (errors.length) {
    console.error(errors);
  }
  res.setHeader('content-type', 'text/html');
  res.write(html);
  res.end();
});

server.listen(5000, () => {
  console.log(`Listening on port 5000 in ${process.env.NODE_ENV} mode`);
});
