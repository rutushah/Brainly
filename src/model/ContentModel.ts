import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  userId: { type: ObjectId, ref: 'User', required: true },
});

export const ContentModel = mongoose.model('Content', contentSchema);