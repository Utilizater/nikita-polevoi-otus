import React from 'react';
import Typography from '@mui/material/Typography';

export default ({ course }) => {
  return (
    <div
      style={{
        cursor: 'pointer',
        borderBottom: '1px solid black',
        marginTop: '10px',
      }}
      onClick={() => {
        window.location = `/course/${course.code}-${course._id}`;
      }}
    >
      <Typography variant='h5'>{course.name}</Typography>
      <Typography>{`Author - ${course.author.login}`}</Typography>
    </div>
  );
};
