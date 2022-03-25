import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
export default ({ courseName, lessons, setLesson, access }) => {
  return (
    <div
      style={{
        marginTop: '100px',
      }}
    >
      <ListItemButton
        onClick={() => {
          window.location = getCourseUrl(window.location.href);
          setLesson({});
        }}
      >
        <h2>{courseName}</h2>
      </ListItemButton>
      {access && (
        <List>
          {lessons.map((lesson) => (
            <ListItemButton
              key={lesson._id}
              onClick={() => {
                window.location =
                  getCourseUrl(window.location.href) + '/' + lesson._id;
              }}
            >
              <ListItemText>{lesson.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};

const getCourseUrl = (url) => {
  return url.split('/').slice(0, 5).join('/');
};
