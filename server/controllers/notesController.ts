import { Request, Response } from "express";
import mongoose from "mongoose";
import { error, success } from "../utils/responseWrapper";
import Notes from "../models/Notes";

// Extend the Request interface to include _id
interface AuthenticatedRequest extends Request {
  _id?: string;
}

export const createNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { note } = req.body;

    if (!note) {
      return res.send(error(404, "Write some note"));
    }

    await Notes.create({
      user: req._id,
      note,
    });

    return res.send(success(200, "Note created successfully."));
  } catch (e) {
    res.send(error(500, "Internal server error"));
  }
};

export const getNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const id = new mongoose.Types.ObjectId(req._id);

    if (!id) {
      return res.send(error(400, "Note ID is required."));
    }

    const notes = await Notes.find({ user: id });

    return res.send(success(200, notes));
  } catch (e) {
    return res.send(error(500, "something went wrong"));
  }
};

export const deleteNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.send(error(400, "Note ID is required."));
    }

    const deleted = await Notes.deleteOne({
      _id: id,
      user: req._id,
    });

    if (deleted.deletedCount === 0) {
      return res.send(error(404, "Note not found or already deleted."));
    }

    return res.send(success(200, "Note deleted successfully"));
  } catch (e) {
    res.send(error(500, "Something went wrong"));
  }
};
