import { faTrophy, faAward, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container } from 'src/components/Container';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { Icon } from 'src/new-components/Icon';
import { SpacerProps, spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { IconList } from './IconList';

interface MentorSectionProps {
  className?: string;
}

const RightCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.div<{ empty?: boolean } & SpacerProps>`
  width: 100%;
  ${props => props.empty && 'padding-bottom: 100%;'}
  border-radius: 0.375rem;
  background: ${NewTheme.gray_400};
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.375rem;
    display: block;
  }
  ${spacerStyle}
`;

const Text = styled.div`
  font-size: 1.125rem;
  font-weight: 300;
  margin-bottom: 1rem;
`;

const _MentorSection = (props: MentorSectionProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Row>
          <Col md={6}>
            <Row>
              <Col sm={6} mt={6} px={2}>
                <Image mb={3}>
                  <img src={require('./assets/mentor_1.jpg').default} />
                </Image>
                <Image>
                  <img src={require('./assets/mentor_3.jpg').default} />
                </Image>
              </Col>
              <Col sm={6} px={2}>
                <Image mb={3}>
                  <img src={require('./assets/mentor_6.jpg').default} />
                </Image>
                <Image>
                  <img src={require('./assets/mentor_5.jpg').default} />
                </Image>
              </Col>
            </Row>
          </Col>
          <RightCol md={6} mdSpacer={{ pl: 6 }}>
            <Heading type={2} mb={3}>
              Poznaj mentora 👋
            </Heading>
            <Text>
              Nazywam się Łukasz Sentkiewicz. Jestem programistą z ponad
              10-letnim doświadczeniem. W latach 2013-2018 wygrałem ponad
              $1,000,000 na TopCoder.com, gdzie robiłem sporo projektów dla
              takich firm jak NASA, DARPA, EPA, Comcast, TopCoder, IBM.
            </Text>
            <Heading type={4} mt={2}>
              Moje osiągnięcia
            </Heading>
            <IconList>
              <li>
                <Icon type="primary" circle size="sm">
                  <FontAwesomeIcon icon={faRocket} />
                </Icon>
                Numer 1 w kategorii Development na TopCoderze.
              </li>
              <li>
                <Icon type="danger" circle size="sm">
                  <FontAwesomeIcon icon={faTrophy} />
                </Icon>
                2014 TopCoder Open Development Champion.
              </li>
              <li>
                <Icon type="danger" circle size="sm">
                  <FontAwesomeIcon icon={faTrophy} />
                </Icon>
                2015 TopCoder Open Development Champion.
              </li>
              <li>
                <Icon type="danger" circle size="sm">
                  <FontAwesomeIcon icon={faTrophy} />
                </Icon>
                2016 TopCoder Open Development Champion.
              </li>
              <li>
                <Icon type="warning" circle size="sm">
                  <FontAwesomeIcon icon={faAward} />
                </Icon>
                350+ wygranych contestów.
              </li>
            </IconList>
          </RightCol>
        </Row>
      </Container>
    </div>
  );
};

export const MentorSection = styled(_MentorSection)`
  padding: 6rem 0;
`;
