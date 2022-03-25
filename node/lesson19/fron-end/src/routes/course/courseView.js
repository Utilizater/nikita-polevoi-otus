import React from 'react';

export default ({ name, description, author = true, access }) => {
  return (
    <div
      style={{
        margin: '30px',
        height: '80vh',
      }}
    >
      <div>
        <h1>{`Course name: ${name}`}</h1>
        <h1>{`Course name: ${description}`}</h1>
        <h1>{`Course author: ${author}`}</h1>
      </div>
      <div
        style={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!access && (
          <div>
            <h2
              style={{
                color: 'red',
              }}
            >
              You don't have access to this course. Request it from author
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
