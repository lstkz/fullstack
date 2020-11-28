import React from 'react';
import { Container } from 'src/components/Container';
import { Loader } from 'src/components/Loader';
import { Dashboard } from 'src/new-components/Dashboard';
import styled from 'styled-components';
import { getCoursesState } from '../interface';
import { useCoursesModule } from '../module';
import { CourseInfo } from './CourseInfo';

const NoData = styled.div`
  text-align: center;
  margin-top: 40px;
`;

export function CoursesView() {
  useCoursesModule();
  const { items, isLoaded } = getCoursesState.useState();

  return (
    <Dashboard>
      <Container data-test="courses-page" mt>
        {!isLoaded ? (
          <Loader center />
        ) : items.length === 0 ? (
          <NoData data-test="no-courses">Brak kursów</NoData>
        ) : (
          items.map(item => <CourseInfo key={item.id} course={item} />)
        )}
      </Container>
    </Dashboard>
  );
}
