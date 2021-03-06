import * as mongoose from 'mongoose';

import { CAPTION_STEP, USER_SELECTED_EMOTION } from '../users.constant';

export const CaptionEditSchema = new mongoose.Schema({
  text: { type: String },
  caption_id: { type: Number },
});

export const CaptionEmotionSchema = new mongoose.Schema({
  happy: { type: String },
  sad: { type: String },
  angry: { type: String },
});

export const Caption = new mongoose.Schema({
  obj_id: { type: Number },
  image_id: { type: String },
  step: {
    type: String,
    enum: CAPTION_STEP,
    default: 'none',
  },
  curatedCaptions: { type: [Number], default: [] },
  captionEdit: { type: [CaptionEditSchema], default: [] },
  captionEmotion: { type: CaptionEmotionSchema, default: {} },
});

export const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return /^[a-z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(v);
        },
        message: props => `${props.value} is not a valid username!`,
      },
      minLength: [6, 'Username is too short'],
      maxLength: [15, 'Username is too long'],
    },
    captionEditCount: { type: Number, default: 0 },
    captionCuratedCount: { type: Number, default: 0 },
    captionEmotionCount: { type: Number, default: 0 },
    range: {
      type: String,
      default: 'all',
      validate: {
        validator(v) {
          return /^(((\d*)-(\d*))|(all))/g.test(v);
        },
        message: props => `${props.value} is not a valid range!`,
      },
    },
    selectedEmotion: {
      type: String,
      enum: USER_SELECTED_EMOTION,
      default: 'all',
    },
    captions: { type: [Caption], default: [] },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    verified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);
