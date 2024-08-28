import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
