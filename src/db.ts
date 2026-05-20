import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
});

const TagSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  userId: { type: ObjectId, ref: 'User', required: true },
});

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
  });

export const UserModel = mongoose.model('User', userSchema);
export const ContentModel = mongoose.model('Content', contentSchema);
export const TagModel = mongoose.model('Tag', TagSchema);
export const LinkModel = mongoose.model('Link', linkSchema);