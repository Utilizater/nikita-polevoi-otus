import React from 'react';

export default ({ lesson }) => {
  console.log(lesson);
  return (
    <div
      style={{
        width: '90%',
        height: '90%',
        margin: '20px',
        // border: '2px solid green',
      }}
    >
      <div>
        <h2>{`Lesson name: ${lesson?.name}`}</h2>
        <h3>{`Lesson description ${lesson?.description}`}</h3>
      </div>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          height: '90%',
          border: '1px solid black',
        }}
      >
        Video place holder
      </div>
    </div>
  );
};
