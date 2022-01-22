import React from 'react';

export default ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '300px',
          backgroundColor: 'gray',
        }}
      ></div>
      <div>{children}</div>
    </div>
  );
};
