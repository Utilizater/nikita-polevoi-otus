import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';
import Layout from '../../components/layouts/leftPanelLayout';
import OneCourseList from './oneCourseList';
import CourseView from './courseView';
import LessonPage from './lessonPage';
import CircularProgress from '@mui/material/CircularProgress';
// import { isEmpty } from 'lodash';

const isLessonUrl = (url) => {
  return url.split('/').length === 6;
};

export default () => {
  const token = useToken();
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const [access, setAccess] = useState(false);
  useEffect(async () => {
    const url = new URL(window.location.href);
    const pathNameArr = url.pathname.split('/');
    const courseId = pathNameArr[2].split('-')[1];
    const lessonId = pathNameArr.length === 4 ? pathNameArr[3] : null;

    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const data = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/get-course?courseId=${courseId}&lessonId=${lessonId}`
        );

        const { _id, code, description, name, lessons, users } =
          data?.data?.course.course ?? {};
        const lesson = data?.data?.lesson ?? {};
        setLesson(lesson);
        setCourse({
          _id,
          name,
          code,
          description,
          author: users.login,
          lessons,
        });
        setAccess(data?.data?.course.access);
      }
    } catch (error) {
      alert(error);
    }
  }, [token]);

  return (
    <Layout
      leftPanel={
        <OneCourseList
          courseName={course?.name}
          lessons={course?.lessons ?? []}
          setLesson={setLesson}
          access={access}
        />
      }
      rightPanel={
        isLessonUrl(window.location.href) ? (
          lesson?._id && course?._id ? (
            <LessonPage lesson={lesson} courseId={course?._id} />
          ) : (
            <CircularProgress />
          )
        ) : (
          <CourseView
            name={course?.name}
            description={course?.description}
            author={course?.author}
            access={access}
          />
        )
      }
    />
  );
};
