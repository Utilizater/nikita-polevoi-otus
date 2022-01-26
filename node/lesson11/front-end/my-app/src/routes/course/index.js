import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';
import Layout from '../../components/layouts/leftPanelLayout';
import OneCourseList from './oneCourseList';
import CourseView from './courseView';
import LessonPage from './lessonPage';
// import { isEmpty } from 'lodash';

const isLessonUrl = (url) => {
  return url.split('/').length === 6;
};

export default () => {
  const token = useToken();
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  useEffect(async () => {
    const url = new URL(window.location.href);
    const pathNameArr = url.pathname.split('/');
    const courseId = pathNameArr[2].split('-')[1];
    const lessonId = pathNameArr.length == 4 ? pathNameArr[3] : null;

    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const data = await axios.get(
          `http://localhost:4000/get-course?courseId=${courseId}&lessonId=${lessonId}`
        );

        const { _id, code, description, name, lessons, users } =
          data?.data?.course ?? {};
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
        // if (lesson) setLesson(lessons);
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
        />
      }
      rightPanel={
        isLessonUrl(window.location.href) ? (
          <LessonPage lesson={lesson} />
        ) : (
          <CourseView
            name={course?.name}
            description={course?.description}
            author={course?.author}
          />
        )
      }
    />
  );
};

//to do
//left panel with course name and lesson list
//course page with course parameter (for right panel)
//lesson page
