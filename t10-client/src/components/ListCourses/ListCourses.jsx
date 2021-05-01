import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './listCourses.css';
import inscriptionsActions from '../../redux/actions/inscriptionAction';
import { STATUS_SUCCESS } from '../../constants';
import Course from '../Course';

const ListCourses = () => {
  const allCourses = useSelector((state) => state.courses.onCourses);
  const id = useSelector((state) => state.user.id);
  const [inscriptedCourseId, setInscriptedCourse] = useState([]);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  useEffect(async () => {
    try {
      const response = await dispatch(
        inscriptionsActions.getAllInscriptionsByUser(id),
      );
      if (response.status === STATUS_SUCCESS) {
        const UserInscriptedCourses = response.data.map(
          (i) => i.onCourse.Course.id,
        );
        setInscriptedCourse(UserInscriptedCourses);
      }
      return false;
    } catch (error) {
      return error;
    }
  }, []);

  const isUserIncripted = (courseId) => {
    let auxIsUserIncripted = false;
    for (let x = 0; x < inscriptedCourseId.length; x += 1) {
      if (courseId === inscriptedCourseId[x]) {
        auxIsUserIncripted = true;
        break;
      }
    }
    return auxIsUserIncripted;
  };

  return (
    <>
      {!allCourses ? (
        <p style={{ color: theme.lettersColor }}>loading...</p>
      ) : (
        <div id="wrapper" className="container-cards-courses">
          <main id="main" className="site-main">
            <div className="container">
              <section className="">
                <div className="description">
                  <p />
                </div>
                <div className="team-content">
                  <div className="row">
                    {allCourses.map((course) => (
                      <Course
                        course={course}
                        key={course.id}
                        isInscripted={isUserIncripted(course.id)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default ListCourses;
