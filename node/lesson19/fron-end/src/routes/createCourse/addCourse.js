import React from 'react';
import TextField from '@mui/material/TextField';

export default ({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '90%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <h2>Create new course</h2>
        <TextField
          required
          label='Course name'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id='outlined-multiline-static'
          label='Course description'
          multiline
          rows={6}
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
        {/* <Button variant='outlined'>Submit</Button> */}
      </div>
    </div>
  );
};
