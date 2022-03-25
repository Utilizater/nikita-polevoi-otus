import React from 'react';

export default ({ leftPanel, rightPanel }) => {
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
          width: '250px',
          backgroundColor: 'lightgray',
        }}
      >
        {leftPanel}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {rightPanel}
      </div>
    </div>
  );
};
