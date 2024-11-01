import Note from "../models/Notes.js";
export const getallnotes = async (req, res) => {
  const userId = req.userId;
  try {
    const Notes = await Note.find({
      userId,
    });

    res.status(200).json({
      success: true,
      data: Notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const getnote = async (req, res) => {
  // check  if id is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid id",
    });
  }
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({
        success: false,
        error: "Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: note,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const createnote = async (req, res) => {
  const userId = req.userId;
  try {
    // const note = new Note(req.body);
    // 201 => created
    const note = await Note.create({
      ...req.body,
      userId,
    });
    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const updatenote = async (req, res) => {
  // check  if id is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid id",
    });
  }
  try {
    const Updatenote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: Updatenote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const deletenote = async (req, res) => {
  // check  if id is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid id",
    });
  }
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(400).json({
        success: false,
        error: "Note not found",
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: true,
      error: error.message,
    });
  }
};
