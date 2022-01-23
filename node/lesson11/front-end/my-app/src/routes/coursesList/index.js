import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';
import CourseListItem from './courseListItem';

export default () => {
  const token = useToken();
  const [coursesList, setCoursesList] = useState([]);
  useEffect(async () => {
    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const coursesList = await axios.get(
          'http://localhost:4000/courses-list'
        );
        setCoursesList(coursesList.data.coursesList);
      }
    } catch (error) {
      alert(error);
    }
  }, [token]);

  return (
    <div
      style={{
        height: '100%',
        // border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '25%',
          background: 'lightGray',
        }}
      >
        <div
          style={{
            width: '90%',
            height: '90%',
            display: 'flex',
            marginTop: '20px',
            alignItems: 'center',
            // justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {coursesList.map((course) => (
            <CourseListItem course={course} key={course._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
