const express = require("express")
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var fetchUser = require('../middleware/fetchUser');

//Route 1 :- get all the notes  using GET
router.get("/api/notes/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }) // here req.user.id is get from  middleware
        res.send(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some internal server error occured");
    }
})


// Route 2:- create a notes using POST 
router.post("/api/notes/addnotes",fetchUser,
    [
        //this all code is copied from express-validator website for validation 
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 character").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            //validation checking 
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Notes({
                title, description, tag, user: req.user.id  // these all things is present in Notes Schema
            })
            const savedNotes = await notes.save();
            res.json(savedNotes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some internal server error occured");
        }
    })
    module.exports = router