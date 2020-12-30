import { faTrophy, faAward, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';
import { Heading } from 'src/components/Heading';
import { Icon } from 'src/components/Icon';
import { IconList, IconListItem } from './IconList';

interface ImageProps {
  src: string;
  className?: string;
}

function Image(props: ImageProps) {
  const { src, className } = props;
  return (
    <div className={classNames(className, 'w-full rounded-md')}>
      <img src={src} className="max-w-full max-h-full rounded-md" />
    </div>
  );
}

export function MentorSection() {
  return (
    <div className="py-24 container grid md:grid-cols-2 gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-20">
          <Image className="mb-3" src={require('./assets/mentor_1.jpg')} />
          <Image src={require('./assets/mentor_3.jpg')} />
        </div>
        <div>
          <Image className="mb-3" src={require('./assets/mentor_6.jpg')} />
          <Image src={require('./assets/mentor_5.jpg')} />
        </div>
      </div>
      <div className="md:pl-20">
        <Heading type={2} className="mb-3">
          Poznaj mentora 👋
        </Heading>
        <div className="text-lg font-light">
          Nazywam się Łukasz Sentkiewicz. Jestem programistą z ponad 10-letnim
          doświadczeniem. W latach 2013-2018 wygrałem ponad $1,000,000 na
          TopCoder.com, gdzie robiłem sporo projektów dla takich firm jak NASA,
          DARPA, EPA, Comcast, TopCoder, IBM.
        </div>
        <Heading type={4} className="mt-6 mb-2">
          Moje osiągnięcia
        </Heading>
        <IconList>
          <IconListItem
            icon={
              <Icon type="primary" circle size="sm">
                <FontAwesomeIcon icon={faRocket} />
              </Icon>
            }
          >
            Numer 1 w kategorii Development na TopCoderze.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="danger" circle size="sm">
                <FontAwesomeIcon icon={faTrophy} />
              </Icon>
            }
          >
            2014 TopCoder Open Development Champion.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="danger" circle size="sm">
                <FontAwesomeIcon icon={faTrophy} />
              </Icon>
            }
          >
            2015 TopCoder Open Development Champion.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="danger" circle size="sm">
                <FontAwesomeIcon icon={faTrophy} />
              </Icon>
            }
          >
            2016 TopCoder Open Development Champion.
          </IconListItem>
          <IconListItem
            icon={
              <Icon type="warning" circle size="sm">
                <FontAwesomeIcon icon={faAward} />
              </Icon>
            }
          >
            350+ wygranych contestów.
          </IconListItem>
        </IconList>
      </div>
    </div>
  );
}
