import * as mongoose from 'mongoose';

export const Category = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    events: [
      {
        name: String,
        operation: String,
        value: Number,
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
