import React from 'react';
import Navigation from '../navigation';

export default ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Navigation />
      <div
        style={{
          flex: '1',
        }}
      >
        {children}
      </div>
    </div>
  );
};
