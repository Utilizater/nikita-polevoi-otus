import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCourseForm from './addCourse';
import Button from '@mui/material/Button';
import AddLesson from './addLesson';
import CourseMenu from './courseMenu';
import { useToken } from '../../components/contexts/authContext.js';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import AccessModalContent from '../../components/accessModalContent';

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
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAccessModalOpen, accessModalController] = useState(false);
  const [usersAccess, setUsersAccess] = useState([]);

  useEffect(async () => {
    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const usersData = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/get-user-list`
        );
        setUsersAccess(
          (usersData.data ?? []).map((user) => ({
            _id: user._id,
            login: user.login,
            access: false,
          }))
        );
        // console.log(usersData.data);
      }
    } catch (err) {
      alert(err);
    }
  }, [token]);

  const createCourse = async () => {
    const accesses = usersAccess
      .filter((item) => item.access)
      .map((item) => ({ user: item._id }));
    const inputObject = {
      courseName,
      courseDescription,
      accesses,
    };

    try {
      setLoading(true);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      const courseData = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/create-new-course`,
        {
          inputObject,
        }
      );
      const courseId = courseData?.data?.courseId;
      lessons.forEach(async (lesson) => {
        if (lesson?.file) {
          console.log('here');
          let formData = new FormData();
          formData.append('file', lesson.file);
          formData.append('courseId', courseId);
          formData.append('name', lesson.title);
          formData.append('description', lesson.description);
          await axios.post(
            `${process.env.REACT_APP_BACK_URL}/file-upload`,
            formData,
            {
              headers: {
                'Content-Type': 'video/mp4',
              },
            }
          );
        }
      });

      setCourseName('');
      setCourseDescription('');
      setLessons([]);
      window.location = '/courses-list';
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            openModal={() => {
              accessModalController(true);
            }}
          />
        </div>
        {loading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
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
        )}
      </div>
      <Modal
        open={isAccessModalOpen}
        onClose={() => accessModalController(false)}
      >
        <AccessModalContent
          setUsersAccess={setUsersAccess}
          usersAccess={usersAccess}
          onClose={() => accessModalController(false)}
        />
      </Modal>
    </>
  );
};
