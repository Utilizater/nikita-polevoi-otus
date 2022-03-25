import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
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
  lessonsName,
  setLessonsName,
  lessonDescription,
  setLessonDescription,
  file,
  setFile,
  removeLesson,
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
        <h2>Edit lesson</h2>
        <TextField
          required
          label='Lesson title'
          value={lessonsName}
          onChange={(e) => setLessonsName(e.target.value)}
        />
        <TextField
          id='outlined-multiline-static'
          label='Lesson description'
          multiline
          rows={6}
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
        />
        <div
          style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button component='label'>
            Re-upload Video
            <input
              type='file'
              hidden
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </Button>
          {file && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography>{file?.name}</Typography>
              <IconButton onClick={() => setFile(null)}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          )}
        </div>
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
            onClick={removeLesson}
          >
            Remove lesson
          </Button>
        </div>

        {/* <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            variant='outlined'
            onClick={submit}
            disabled={titleText === ''}
            disabled={
              titleText === '' || descriptionText === '' || file === null
            }
          >
            Add lesson
          </Button>
        </div> */}
      </div>
    </div>
  );
};
