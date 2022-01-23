import React, { useState } from 'react';
import axios from 'axios';
import AddCourseForm from './addCourse';
import Button from '@mui/material/Button';
import AddLesson from './addLesson';
import CourseMenu from './courseMenu';
import { useToken } from '../../components/contexts/authContext.js';

const courseStages = {
  courseCrete: 'COURSE_CREATE',
  addLesson: 'ADD_LESSON',
};

export default () => {
  const token = useToken();
  const [courseName, setCourseName] = useState('Course Name');
  const [courseDescription, setCourseDescription] = useState(
    'Some Description'
  );
  const [stage, setStage] = useState(courseStages.addLesson);
  const [lessons, setLessons] = useState([
    {
      title: 'first lesson',
      description: 'first lesson description',
      video: 'TO Do',
    },
    {
      title: 'second lesson',
      description: 'second lesson description',
      video: 'TO Do',
    },
  ]);

  const createCourse = async () => {
    const inputObject = {
      courseName,
      courseDescription,
      lessons: lessons.map((lesson) => {
        // console.log(lesson);
        return {
          name: lesson.title,
          description: lesson.description,
          video: 'TO DO',
        };
      }),
    };
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      await axios.post('http://localhost:4000/create-new-course', {
        inputObject,
      });
      setCourseName('');
      setCourseDescription('');
      setLessons([]);
      window.location = '/courses-list';
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          width: '250px',
          backgroundColor: 'lightGray',
          paddingLeft: '10px',
        }}
      >
        <CourseMenu
          courseName={stage === courseStages.addLesson ? courseName : ''}
          lessons={lessons}
        />
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '400px',
            height: '500px',
            marginBottom: '200px',
            border: '1px solid black',
          }}
        >
          {stage === courseStages.courseCrete && (
            <AddCourseForm
              courseName={courseName}
              setCourseName={setCourseName}
              courseDescription={courseDescription}
              setCourseDescription={setCourseDescription}
            />
          )}
          {stage === courseStages.addLesson && (
            <AddLesson setLessons={setLessons} />
          )}
          <div
            style={{
              // border: '1px solid green',
              height: '70px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {stage === courseStages.courseCrete && (
              <Button
                variant='contained'
                onClick={() => {
                  setStage(courseStages.addLesson);
                }}
                disabled={courseName === ''}
              >
                Next
                {/* {stage === courseStages.courseCrete ? 'Next' : 'Previous'} */}
              </Button>
            )}
            {stage === courseStages.addLesson && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => {
                    setStage(courseStages.courseCrete);
                    setLessons([]);
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant='contained'
                  onClick={createCourse}
                  disabled={lessons.length === 0}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
