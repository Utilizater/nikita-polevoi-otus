import React from 'react';

export default ({ name, description, author }) => {
  return (
    <div
      style={{
        margin: '30px',
      }}
    >
      <h1>{`Course name: ${name}`}</h1>
      <h1>{`Course name: ${description}`}</h1>
      <h1>{`Course author: ${author}`}</h1>
    </div>
  );
};
