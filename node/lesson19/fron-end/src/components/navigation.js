import React from 'react';
import Button from '@mui/material/Button';
import { useToken, useSetToken } from './contexts/authContext';

export default () => {
  const isAuthorized = !!useToken();
  const updateToken = useSetToken();

  const onLogIn = () => {
    window.location = '/login';
  };

  // console.log(token);

  const onLogOut = () => {
    console.log('inLogout');
    window.location = '/login';
    updateToken('');
    window.localStorage.setItem('token', '');
  };

  return (
    <div
      style={{
        width: '100%',
        // border: '1px solid black',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#24292e',
      }}
    >
      {isAuthorized && (
        <Button
          onClick={() => {
            window.location = '/courses-list';
          }}
        >
          List of courses
        </Button>
      )}

      {isAuthorized && (
        <Button
          onClick={() => {
            window.location = '/create-course';
          }}
        >
          Create course
        </Button>
      )}
      <Button onClick={isAuthorized ? onLogOut : onLogIn}>
        {isAuthorized ? 'Log Out' : 'Log In'}
      </Button>
    </div>
  );
};
