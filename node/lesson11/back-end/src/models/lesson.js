import mongoose from 'mongoose';

const lessonsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  courseId: mongoose.Schema.Types.ObjectId,
  video: String,
});

export default mongoose.model('Lesson', lessonsSchema);
