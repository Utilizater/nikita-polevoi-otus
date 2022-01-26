import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default ({ courseName, lessons }) => {
  return (
    <div
      style={{
        // border: '2px solid red',
        marginTop: '100px',
      }}
    >
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
