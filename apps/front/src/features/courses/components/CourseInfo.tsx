import * as React from 'react';
import { Course } from 'shared';
import { createUrl } from 'src/common/url';
import { Button } from 'src/components/Button';
import { MediaCard } from 'src/components/MediaCard';
import { Title } from 'src/components/Title';
import { Colored } from 'src/components/Colored';
import styled from 'styled-components';

interface CourseInfoProps {
  className?: string;
  course: Course;
}

function formatRemaining(date: Date) {
  const diff = date.getTime() - Date.now();
  if (diff <= 0) {
    return '';
  }
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 1) {
    const form = days < 10 ? 'y' : 'o';
    return `Pozostał${form} ${days} dni!`;
  }
  if (hours > 1) {
    if (hours < 5) {
      return `Pozostały ${hours} godziny!`;
    }
    return `Pozostało ${hours} godzin!`;
  }
  if (minutes > 1) {
    if (minutes < 5) {
      return `Pozostały ${minutes} minuty!`;
    }
    return `Pozostało ${minutes} minut!`;
  }
  return `Koniec za ${seconds}s!`;
}

const PromoWrapper = styled.div`
  width: 100%;
`;

export const CourseInfo = (props: CourseInfoProps) => {
  const { course } = props;
  const isPromo = Date.now() < new Date(course.promoEnds).getTime();
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    let nextTick = 1;
    const id = setInterval(() => {
      setTick(nextTick++);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, []);

  const renderBuyButton = () => {
    const btn = (
      <Button
        block
        testId="show-btn"
        type="primary"
        href={createUrl({ name: 'buy-course', id: course.id })}
      >
        KUP za {isPromo ? course.promoPrice : course.price} PLN
      </Button>
    );
    if (isPromo) {
      return (
        <PromoWrapper>
          {btn}
          <div>
            <Colored color="red">
              {formatRemaining(new Date(course.promoEnds))}
              <br />
              Później <strong>{course.price}</strong> PLN
            </Colored>
          </div>
        </PromoWrapper>
      );
    }
    return <>{btn}</>;
  };

  return (
    <MediaCard
      testId={`course_${course.id}`}
      title={
        <>
          <Title
            href={createUrl({
              name: 'course',
              id: course.id,
            })}
            testId="title"
          >
            {course.name}
          </Title>
        </>
      }
      description={course.description}
      button={
        course.hasAccess ? (
          <Button
            testId="show-btn"
            type="primary"
            href={createUrl({ name: 'course', id: course.id })}
          >
            POKAŻ
          </Button>
        ) : (
          renderBuyButton()
        )
      }
    />
  );
};
