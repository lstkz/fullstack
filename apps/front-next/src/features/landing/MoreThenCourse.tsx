import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faVideo,
  faGraduationCap,
  faLaptopCode,
  faChalkboardTeacher,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Illustration1 } from './Illustration1';
import { Icon } from 'src/components/Icon';
import { IconList, IconListItem } from './IconList';
import { Heading } from 'src/components/Heading';

export function MoreThenCourse() {
  return (
    <div className="container grid my-16 md:grid-cols-2">
      <div className="md:pl-16">
        <Heading type={2}>To więcej niż zwykły kurs programowania</Heading>
        <div className="my-6 text-lg font-light">
          Fullstack.pl to kompletna platforma do nauki programowania.
        </div>
        <IconList>
          <IconListItem
            icon={
              <Icon type="primary" circle size="sm">
                <FontAwesomeIcon icon={faGraduationCap} />
              </Icon>
            }
          >
            Podział nauki na moduły.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="warning" circle size="sm">
                <FontAwesomeIcon icon={faVideo} />
              </Icon>
            }
          >
            Każdy moduł zawiera lekcje video i zadania do zrobienia.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="success" circle size="sm">
                <FontAwesomeIcon icon={faTasks} />
              </Icon>
            }
          >
            Zadania są automatycznie sprawdzane.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="primary" circle size="sm">
                <FontAwesomeIcon icon={faLaptopCode} />
              </Icon>
            }
          >
            Wbudowane IDE w przeglądarce. Nie trzeba nic ściągać!
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="warning" circle size="sm">
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </Icon>
            }
          >
            Po każdej lekcji możesz zobaczyć film video z rozwiązaniem wzorcowym
            przez mentora.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="danger" circle size="sm">
                <FontAwesomeIcon icon={faExclamation} />
              </Icon>
            }
          >
            Nie wiesz jak zrobić zadania? Przeczytaj wskazówkę albo zobacz
            kompletne rozwiązanie.
          </IconListItem>
        </IconList>
      </div>
      <Illustration1 className="h-auto max-w-full " />
    </div>
  );
}
