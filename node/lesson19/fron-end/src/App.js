import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './routes/auth';
import CoursesList from './routes/coursesList';
import CreateCourse from './routes/createCourse';
import Layout from './components/layouts/mainLayout';
import EditCourse from './routes/editCourse';
import { AuthProvider } from './components/contexts/authContext';
import Course from './routes/course';

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Router>
          <Routes>
            <Route exact path='/' element={<CoursesList />} />
            <Route exact path='/courses-list' element={<CoursesList />} />
            <Route exact path='/course/:courseCode' element={<Course />} />
            <Route exact path='/course/:courseCode/*' element={<Course />} />
            <Route
              exact
              path='/edit-course/:courseId'
              element={<EditCourse />}
            />
            <Route exact path='/login' element={<Auth />} />
            <Route exact path='/create-course' element={<CreateCourse />} />
            <Route path='*' element={<Auth />} />
          </Routes>
        </Router>
      </Layout>
    </AuthProvider>
  );
};

export default App;
