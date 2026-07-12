import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      tag,
      search,
    } = req.query;

    const skip = (page - 1) * perPage;

    const notesQuery = Note.find();

    // Фільтрація по тегу
    if (tag) {
      notesQuery.where({
        tag,
      });
    }

    // Пошук по title та content
    if (search) {
      notesQuery.where({
        $or: [
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            content: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      });
    }

    const notes = await notesQuery
      .skip(skip)
      .limit(perPage);

    const totalNotes = await Note.countDocuments(
      notesQuery.getFilter(),
    );

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages: Math.ceil(totalNotes / perPage),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndUpdate(
      noteId,
      req.body,
      {
        returnDocument: 'after',
      },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
