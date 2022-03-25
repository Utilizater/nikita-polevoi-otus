import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Comments from './comments';
import axios from 'axios';
import { useToken } from '../../components/contexts/authContext.js';

export default ({ lesson, courseId }) => {
  const token = useToken();
  const [commentPanel, setCommentPanel] = useState(false);
  const [comments, setComments] = useState([]);
  const lessonId = lesson._id;
  const source =
    courseId && lessonId
      ? `${process.env.REACT_APP_BACK_URL}/video?courseId=${courseId}&lessonId=${lessonId}`
      : '';

  useEffect(async () => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      const commentsData = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/get-comments?&lessonId=${lessonId}`
      );
      setComments(
        commentsData.data.map((item) => ({
          _id: item._id,
          text: item.text,
          date: item.date,
          name: item.users.login,
        }))
      );
    }
  }, [token]);

  const submitComment = async (commentText) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const commentDate = await axios.post(
      `${process.env.REACT_APP_BACK_URL}/add-comment`,
      {
        text: commentText,
        lessonId,
      }
    );

    setComments([
      ...comments,
      {
        _id: commentDate.data.comment._id,
        text: commentDate.data.comment.text,
        date: commentDate.data.comment.date,
        name: commentDate.data.userLogin,
      },
    ]);
  };

  return (
    <>
      <div
        style={{
          width: '90%',
          height: '90%',
          margin: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2>{`Lesson name: ${lesson?.name}`}</h2>
            <h3>{`Lesson description ${lesson?.description}`}</h3>
          </div>
          <Button
            color='secondary'
            onClick={() => {
              setCommentPanel(true);
            }}
          >
            Show Comments
          </Button>
        </div>

        <div
          style={{
            marginTop: '20px',
            width: '100%',
            height: '90%',
            // border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video controls autoPlay loop width='600px'>
            <source src={source} type='video/mp4' />
          </video>
        </div>
      </div>

      <Drawer
        anchor='right'
        open={commentPanel}
        onClose={() => setCommentPanel(false)}
      >
        <Comments submitComment={submitComment} comments={comments} />
      </Drawer>
    </>
  );
};
