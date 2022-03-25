import React from 'react';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  buttonRoot: {
    background: '#FF8BA0',
    '&:hover': {
      background: 'red',
    },
  },
});

export default ({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
  removeCourse,
}) => {
  const classes = useStyles();
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
        <h2>Edit course</h2>
        <TextField
          required
          hiddenLabel
          label='Course name'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          hiddenLabel
          id='outlined-multiline-static'
          label='Course description'
          multiline
          rows={6}
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            endIcon={<DeleteIcon />}
            variant='contained'
            size='small'
            className={classes.buttonRoot}
            onClick={removeCourse}
          >
            Remove course
          </Button>
        </div>
      </div>
    </div>
  );
};
