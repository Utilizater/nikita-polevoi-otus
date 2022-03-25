import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default ({ course, userId }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
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
      <div>
        {userId === course.author._id && (
          <IconButton
            onClick={() => {
              window.location = `/edit-course/${course._id}`;
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
