import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';

export default ({ comments, submitComment }) => {
  // console.log(comments);
  const [commentText, setCommentText] = useState('');
  return (
    <>
      <div
        style={{
          marginTop: '30px',
          height: '100%',
          overflow: 'auto',
          padding: '10px',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Comments
        </h2>
        <div
          style={{
            // border: '1px solid black',
            width: '100%',
            height: '650px',
            // flex: '1',
          }}
        >
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
      <div
        style={{
          padding: '10px',
        }}
      >
        <div
          style={{
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id='outlined-multiline-static'
            label='Lesson comment'
            multiline
            fullWidth
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            endIcon={<SendIcon />}
            variant='contained'
            onClick={() => {
              submitComment(commentText);
              setCommentText('');
            }}
          >
            Add Comment
          </Button>
        </div>
      </div>
    </>
  );
};

const Comment = ({ comment }) => {
  const date = format(new Date(comment.date), 'dd/MM/yyyy hh:mm:ss');
  return (
    <div
      style={{
        border: '1px solid lightgray',
        borderRadius: '5px',
        marginTop: '10px',
        padding: '5px 5px 0 5px',
        minHeight: '50px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: '5',
          // border: '1px solid red',
        }}
      >
        <span
          style={{
            wordWrap: 'break-word',
          }}
        >
          {comment.text}
        </span>
      </div>
      <div
        style={{
          flex: '1',
          // border: '1px solid green',
          fontSize: '10px',
        }}
      >
        <span
          style={{
            textAlign: 'end',
          }}
        >
          <b>Author:</b>
          {` ${comment.name} `}
          <b>Date:</b>
          {` ${date.toString()}`}
        </span>
      </div>
    </div>
  );
};
