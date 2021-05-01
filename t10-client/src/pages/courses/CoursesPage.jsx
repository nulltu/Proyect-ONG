import React, { useEffect } from 'react';
import ListCourses from '../../components/ListCourses';
import { scrollToTop } from '../../utils/reactScroll';

function CoursesPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <ListCourses />;
}

export default CoursesPage;
