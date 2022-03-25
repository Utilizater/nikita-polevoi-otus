import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import InputForm from './inputForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const authState = {
  signIn: 'SIGN_IN',
  signOut: 'SIGN_OUT',
};

export default () => {
  const [state, setState] = useState(authState.signIn);
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const login = async (login, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/login`,
        {
          login,
          password,
        }
      );
      if (response?.data?.accessToken) {
        const token = response?.data?.accessToken;
        localStorage.setItem('token', token);
        window.location = '/';
      }
    } catch (e) {
      setAlertOpen(true);
    }
  };

  const createAccount = async (login, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/create-account`,
        {
          login,
          password,
        }
      );
      if (response?.data?.accessToken) {
        console.log(response?.data?.accessToken);
        localStorage.setItem('token', response?.data?.accessToken);
        window.location = '/';
      }
    } catch (e) {
      setAlertOpen(true);
    }
  };

  const questionString =
    state === authState.signIn
      ? 'Create an account?'
      : state === authState.signOut
      ? 'Log in?'
      : '';

  const stateToggle = () => {
    if (state === authState.signIn) {
      setState(authState.signOut);
      return;
    }
    if (state === authState.signOut) {
      setState(authState.signIn);
      return;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '500px',

          marginBottom: '200px',
        }}
      >
        <div
          style={{ width: '100%', height: '90%', border: '1px solid black' }}
        >
          {
            <InputForm
              title={
                state === authState.signIn
                  ? 'Login'
                  : state === authState.signOut
                  ? 'Create an account'
                  : ''
              }
              submit={
                state === authState.signIn
                  ? login
                  : state === authState.signOut
                  ? createAccount
                  : () => null
              }
              submitText={
                state === authState.signIn
                  ? 'Log In'
                  : state === authState.signOut
                  ? 'Create Account'
                  : ''
              }
            />
          }
        </div>
        <div style={{ height: '10%' }}>
          <p style={{ textAlign: 'center' }}>
            <Button size='small' onClick={stateToggle}>
              {questionString}
            </Button>{' '}
          </p>
        </div>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity='error'
          sx={{ width: '100%' }}
        >
          Authorization issue
        </Alert>
      </Snackbar>
    </div>
  );
};
