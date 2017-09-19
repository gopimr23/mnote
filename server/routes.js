const express = require("express");
let router = express.Router();

const notesMiddleware = require("./middleware/notes");

router.get("/", notesMiddleware.getNotes);
router.post("/", notesMiddleware.saveNotes);

router.post("/kafka", notesMiddleware.getMessage);
module.exports = router;