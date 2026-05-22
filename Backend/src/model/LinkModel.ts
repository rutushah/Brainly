import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const TagSchema = new mongoose.Schema({
    title: { type: String, required: true },
});



const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
  });



export const TagModel = mongoose.model('Tag', TagSchema);
export const LinkModel = mongoose.model('Link', linkSchema);