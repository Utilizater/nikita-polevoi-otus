import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';
import CourseListItem from './courseListItem';
import jwt_decode from 'jwt-decode';

export default () => {
  const token = useToken();
  const [currentUserId, setCurrentUserId] = useState(null);

  const [coursesList, setCoursesList] = useState([]);
  useEffect(async () => {
    try {
      if (token) {
        const decoded = jwt_decode(token);
        setCurrentUserId(decoded?.userId);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const coursesList = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/courses-list`
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
            flexDirection: 'column',
            // overflow: 'auto',
          }}
        >
          {coursesList.map((course) => (
            <CourseListItem
              course={course}
              userId={currentUserId}
              key={course._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
