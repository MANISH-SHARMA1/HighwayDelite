import mongoose, { Document, Schema, Types, model } from "mongoose";

export interface INotes extends Document {
  user: Types.ObjectId;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const notesSchema = new Schema<INotes>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      required: [true, "Note is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Notes = model<INotes>("Notes", notesSchema);
export default Notes;
