import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    ranking: {
      type: Number,
    },
    position: Number,
    playerAvatarUrl: String,
  },
  {
    timestamps: true,
    collection: 'Player',
  },
);
