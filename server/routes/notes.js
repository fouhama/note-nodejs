import express from "express";
import {
  getallnotes,
  getnote,
  createnote,
  updatenote,
  deletenote,
} from "../controller/notes.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.route("/").get(getallnotes).post(createnote);
// router.get("/", getallnotes);
// router.post("/", createnote);
router.route("/:id").get(getnote).put(updatenote).delete(deletenote);
// router.get("/:id", getnote);
// router.put("/:id", updatenote);
// router.delete("/:id", deletenote);

export default router;
