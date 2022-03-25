import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
export default ({ setLessonId, courseName, lessons, openModal }) => {
  return (
    <div
      style={{
        marginTop: '100px',
      }}
    >
      <Button onClick={openModal}>User's access</Button>
      <ListItemButton
        onClick={() => {
          setLessonId(null);
        }}
      >
        <h2>{courseName}</h2>
      </ListItemButton>

      <List>
        {lessons.map((lesson, i) => {
          return (
            <ListItemButton
              key={lesson._id}
              onClick={() => {
                setLessonId(lesson._id);
              }}
            >
              <ListItemText>{lesson.name}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
};
