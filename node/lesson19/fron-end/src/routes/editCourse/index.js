import React, { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import LeftPanelLayout from '../../components/layouts/leftPanelLayout';
import { useToken } from '../../components/contexts/authContext.js';
import { isEmpty } from 'lodash';
import OneCourseList from './oneCourseList';
import Button from '@mui/material/Button';
import EditCourseForm from './editCourseForm';
import EditLessonPage from './editLessonForm';
import Modal from '@mui/material/Modal';
import AccessModalContent from '../../components/accessModalContent';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default () => {
  const token = useToken();
  const [course, setCourse] = useState({});
  const [lessonId, setLessonId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isAccessModalOpen, accessModalController] = useState(false);
  const [usersAccess, setUsersAccess] = useState([]);

  // console.log(usersAccess);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const getLessonProp = (lessonId, parameter) => {
    if (!lessonId) return null;
    const lesson = course.lessons.find((lesson) => lesson._id === lessonId);
    return lesson[parameter];
  };

  const setLessonProp = (lessonId, parameter) => (newValue) => {
    const lessons = [...course.lessons];
    const index = lessons.findIndex((item) => item._id === lessonId);
    lessons[index][parameter] = newValue;
    setCourse({ ...course, lessons });
  };

  useEffect(async () => {
    try {
      if (token) {
        const url = new URL(window.location.href);
        const urlArr = url.pathname.split('/');
        const courseId = urlArr[urlArr.length - 1];
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const data = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/get-course?courseId=${courseId}`
        );
        const { _id, code, description, name, lessons, users, accesses } =
          data?.data?.course?.course ?? {};

        setCourse({
          _id,
          name,
          code,
          description,
          author: users.login,
          lessons,
        });

        const usersData = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/get-user-list`
        );

        // const checkUserAccess = (accesses, userId) => {
        //   const user = !!accesses.find(item => item.user === userId)
        // };

        // console.log(accesses);

        setUsersAccess(
          (usersData.data ?? []).map((user) => ({
            _id: user._id,
            login: user.login,
            access: !!accesses.find((item) => item.user === user._id),
          }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const submit = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    try {
      // accesses: usersAccess
      // .filter((item) => item.access)
      // .map((item) => ({ user: item._id }))

      await axios.put(`${process.env.REACT_APP_BACK_URL}/edit-course`, {
        course: {
          ...course,
          accesses: usersAccess
            .filter((item) => item.access)
            .map((item) => ({ user: item._id })),
        },
      });
      setAlertOpen(true);
    } catch (error) {
      alert(error);
    }
  };

  const removeCourse = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/delete-course?courseId=${course._id}`
      );
      window.location = '/courses-list';
      setAlertOpen(true);
    } catch (error) {
      alert(error);
    }
  };

  const removeLesson = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/delete-lesson?lessonId=${lessonId}`
      );
      setLessonId(null);
      setAlertOpen(true);
      //remove lesson from state
      const lessons = [...course.lessons];
      const index = lessons.findIndex((item) => item._id === lessonId);
      lessons.splice(index, 1);
      setCourse({ ...course, lessons });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <LeftPanelLayout
        leftPanel={
          !isEmpty(course) && (
            <OneCourseList
              course={course}
              setLessonId={setLessonId}
              courseName={course.name}
              lessons={course.lessons ?? []}
              openModal={() => {
                accessModalController(true);
              }}
            />
          )
        }
        rightPanel={
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '400px',
                height: '600px',
                marginBottom: '200px',
                // border: '1px solid red',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  border: '1px solid black',
                }}
              >
                {lessonId ? (
                  <EditLessonPage
                    lessonsName={getLessonProp(lessonId, 'name')}
                    setLessonsName={setLessonProp(lessonId, 'name')}
                    lessonDescription={getLessonProp(lessonId, 'description')}
                    setLessonDescription={setLessonProp(
                      lessonId,
                      'description'
                    )}
                    file={getLessonProp(lessonId, 'file')}
                    setFile={setLessonProp(lessonId, 'file')}
                    removeLesson={removeLesson}
                  />
                ) : (
                  <EditCourseForm
                    courseName={course.name ?? ''}
                    setCourseName={(str) => {
                      setCourse({ ...course, name: str });
                    }}
                    courseDescription={course.description ?? ''}
                    setCourseDescription={(str) => {
                      setCourse({ ...course, description: str });
                    }}
                    removeCourse={removeCourse}
                  />
                )}
              </div>
              <div
                style={{
                  height: '70px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <Button variant='contained' onClick={submit}>
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          Changes is saved
        </Alert>
      </Snackbar>
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
