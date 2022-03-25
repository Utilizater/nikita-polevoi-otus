import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

export default ({ setUsersAccess, usersAccess = [], onClose }) => {
  const onChange = (id, newValue) => {
    const arr = [...usersAccess];
    arr.forEach((user) => {
      if (user._id === id) {
        user.access = newValue;
      }
    });
    setUsersAccess(arr);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          height: '80vh',
          overflow: 'auto',
        }}
      >
        <h2>User's access</h2>
        <br />
        <FormGroup>
          {usersAccess.map((element) => (
            <FormControlLabel
              key={element._id}
              control={
                <Checkbox
                  checked={element?.access}
                  onChange={(e) => onChange(element._id, e.target.checked)}
                />
              }
              label={element?.login}
            />
          ))}
        </FormGroup>
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Button onClick={onClose}>Ok</Button>
      </div>
    </div>
  );
};
