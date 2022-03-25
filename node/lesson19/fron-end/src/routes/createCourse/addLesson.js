import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default ({ setLessons }) => {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [file, setFile] = useState(null);

  const submit = () => {
    setLessons((state) => [
      ...state,
      { title: titleText, description: descriptionText, file },
    ]);
    setTitleText('');
    setDescriptionText('');
    setFile(null);
  };
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
        <h2>New lesson</h2>
        <TextField
          required
          label='Lesson title'
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />
        <TextField
          id='outlined-multiline-static'
          label='Lesson description'
          multiline
          rows={6}
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
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
            Upload Video
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
        </div>
      </div>
    </div>
  );
};
