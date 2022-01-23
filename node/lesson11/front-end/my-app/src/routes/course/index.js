import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';

export default () => {
  const token = useToken();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  useEffect(async () => {
    const url = new URL(window.location.href);
    const pathNameArr = url.pathname.split('/');
    const courseId = pathNameArr[2].split('-')[1];
    const lessonId =
      pathNameArr.length == 4 ? pathNameArr[3].split('-')[1] : null;

    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const course = await axios.get(
          `http://localhost:4000/get-course?courseId=${courseId}&lessonId=${lessonId}`
        );
        setCourse(course);
      }
    } catch (error) {
      alert(error);
    }
  }, [token]);

  console.log(course);

  return <h1>One course</h1>;
};
