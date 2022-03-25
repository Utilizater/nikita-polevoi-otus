import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default ({ title, submit, submitText }) => {
  const [loginText, setLoginText] = useState('');
  const [passwordText, setPasswordText] = useState('');
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
        <h2>{title}</h2>
        <TextField
          required
          label='Login'
          onChange={(e) => setLoginText(e.target.value)}
        />
        <TextField
          required
          id='outlined-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          onChange={(e) => setPasswordText(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={() => {
            submit(loginText, passwordText);
          }}
        >
          {submitText}
        </Button>
      </div>
    </div>
  );
};
