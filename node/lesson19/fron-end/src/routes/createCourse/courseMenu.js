import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export default ({ courseName, lessons, openModal }) => {
  return (
    <div
      style={{
        // border: '2px solid red',
        marginTop: '100px',
      }}
    >
      <Button onClick={openModal}>User's access</Button>
      <h2>{courseName}</h2>
      <List>
        {lessons.map((lesson, index) => (
          <ListItem key={`item-${lesson.title}-${index}`}>
            <ListItemText>{lesson.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
