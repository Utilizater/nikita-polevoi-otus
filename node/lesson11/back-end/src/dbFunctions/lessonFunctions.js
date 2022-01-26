import Lesson from '../models/lesson.js';

export const getLessonById = async (lessonId) => {
  return await Lesson.findOne({ _id: lessonId });
};
