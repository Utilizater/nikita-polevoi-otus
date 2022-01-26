import mongoose from 'mongoose';
import Course from '../models/courses.js';
import Lesson from '../models/lesson.js';
import pkg from 'lodash';

export const createNewCourse = async (obj, userId) => {
  // obj.lessons.forEach((el) => {
  //   console.log(el?.video);
  // });

  const { camelCase } = pkg;
  const course = new Course({
    _id: mongoose.Types.ObjectId(),
    code: camelCase(obj.courseName),
    name: obj.courseName,
    description: obj.courseDescription,
    author: userId,
  });
  const savedCourse = await course.save();

  obj.lessons.forEach(async (item) => {
    // console.log(item?.video);
    const lesson = new Lesson({
      _id: mongoose.Types.ObjectId(),
      courseId: savedCourse._id,
      code: camelCase(item?.name),
      name: item?.name,
      description: item?.description,
      video: 'TO DO',
    });
    await lesson.save();
  });

  return { courseId: savedCourse._id };
};

export const getCoursesList = async () => {
  const coursesList = await Course.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {
      $unwind: {
        path: '$author',
      },
    },
  ]);
  return coursesList;
};

export const getCourseById = async (courseId) => {
  const [course] = await Course.aggregate([
    {
      $match: {
        _id: {
          $eq: mongoose.Types.ObjectId(courseId),
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $unwind: {
        path: '$users',
      },
    },
    {
      $lookup: {
        from: 'lessons',
        localField: '_id',
        foreignField: 'courseId',
        as: 'lessons',
      },
    },
    {
      $project: {
        _id: 1,
        code: 1,
        description: 1,
        name: 1,
        'users._id': 1,
        'users.login': 1,
        'lessons._id': 1,
        'lessons.name': 1,
        'lessons.code': 1,
      },
    },
  ]);
  return course;
};
