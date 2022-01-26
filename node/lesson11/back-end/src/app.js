import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { createUser, authorization } from './dbFunctions/usersFunctions.js';
import {
  createNewCourse,
  getCoursesList,
  getCourseById,
} from './dbFunctions/courseFunctions.js';
import { getLessonById } from './dbFunctions/lessonFunctions.js';
import { getUserIdFromRequest } from './utils/getUserId.js';

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.hvxrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    // useMongoClient: true,
  }
);

// const course = new Course({
//   _id: mongoose.Types.ObjectId(),
//   name: 'firstProject',
// });

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload());

const authenticatedToken = (req, res, next) => {
  const authHeader = req?.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/courses-list', authenticatedToken, async (req, res) => {
  const coursesList = await getCoursesList();
  res.json({ coursesList });
});

app.post('/create-new-course', authenticatedToken, async (req, res) => {
  const { inputObject } = req.body;
  const userId = getUserIdFromRequest(req);
  await createNewCourse(inputObject, userId);
  res.send(true);
});

app.post('/file-upload', authenticatedToken, async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  // console.log(req.files);

  res.send(true);
});

app.get('/get-course', authenticatedToken, async (req, res) => {
  const { courseId, lessonId } = req.query;
  const course = await getCourseById(courseId);
  if (lessonId !== 'null' && lessonId !== undefined) {
    const lesson = await getLessonById(lessonId);
    res.json({ course, lesson });
    return;
  }
  res.json({ course });
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await authorization(login, password);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } catch (e) {
    res.sendStatus(401);
  }
  // const user = await authorization('nick2', 'mypass2');
});

app.post('/createAccount', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await createUser(login, password);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } catch (e) {
    res.sendStatus(401);
  }
});

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});

//list of end-points
//1. create user
//2. authorization
//3. get list of courses
//4. create course
//5. update course
//5.1. add video
//5.2. change name and/or description
//5.3. upload video
//6. delete course
//7. get video
//8. lesson CRUD
