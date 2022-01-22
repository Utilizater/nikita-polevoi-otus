import mongoose from 'mongoose';

const lessonsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  code: String,
  lessonNumber: Number,
  name: String,
  description: String,
  video: String,
});

export default mongoose.model('Lesson', lessonsSchema);
