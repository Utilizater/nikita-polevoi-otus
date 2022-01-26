import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default ({ setLessons }) => {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [file, setFile] = useState();
  const submit = () => {
    setLessons((state) => [
      ...state,
      { title: titleText, description: descriptionText, file },
    ]);
    setTitleText('');
    setDescriptionText('');
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
          >
            Add lesson
          </Button>
          {/* <Button variant='outlined'>Remove</Button> */}
        </div>
      </div>
    </div>
  );
};
