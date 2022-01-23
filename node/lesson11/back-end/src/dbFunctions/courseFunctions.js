import mongoose from 'mongoose';
import Course from '../models/courses.js';
import Lesson from '../models/lesson.js';
import pkg from 'lodash';

export const createNewCourse = async (obj, userId) => {
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
    const lesson = new Lesson({
      _id: mongoose.Types.ObjectId(),
      courseId: savedCourse._id,
      code: camelCase(item.name),
      name: item.name,
      description: item.description,
      video: item.video,
    });
    await lesson.save();
  });
};

export const getCoursesList = async () => {
  // const coursesList = await Course.find({});
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
  // const course = await Course.findOne({ _id: courseId });
  return await Course.findOne({ _id: courseId });
};
