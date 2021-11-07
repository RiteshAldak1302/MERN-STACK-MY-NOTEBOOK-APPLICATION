const express = require("express")
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");  //this is import for validation 
var fetchUser = require('../middleware/fetchUser'); // we use middleware to obtain userid which is present in it 

// where we Required login there we use fetchUser becoz it verify Token 

//Route 1 :- get all the notes  using GET {Login required}
router.get("/api/notes/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }) // here req.user.id is get from  middleware fetchUser
        res.send(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some internal server error occured");
    }
})


// Route 2:- create a notes using POST  {Login required}
router.post("/api/notes/addnotes", fetchUser,
    [
        //this all code is copied from express-validator website for validation 
        // and here is validation is required to write valid thuing in title and description

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
                title, description, tag, user: req.user.id  // these all things is present in Notes Schema // in schema whatever we write all the thing here we have to add to creates all these things in Notes
            })
            const savedNotes = await notes.save();
            res.json(savedNotes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some internal server error occured");
        }
    })


    // Route 3:- Update a notes using Patch or Put  {Login required}

    router.patch("/api/notes/updatenotes/:id", fetchUser,
    async (req, res) => {
        
            try {
                const title = req.body.title ;
            const description = req.body.description ;
            const tag = req.body.tag ;
           
            //create a new object (we can also update the notes by creating new object of newnotes and updated thing will be stored in this object and then we use $set to upadte news this way of code to update notes is commented )
            // const newNote = {} //this is blank object
            // if(title){
            //     newNote.title = title
            // }
            // if(description){
            //     newNote.description = description
            // }
            // if(tag){
            //     newNote.tag = tag
            // }
            
            let note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not Allowed");
            }
            if(note.user.toString() !== req.user.id){ // this check that user wanted to updated only his/her notes 
                return res.status(404).send("Not Allowed");
            }
           const  updatenotes = await Notes.findByIdAndUpdate(req.params.id ,req.body, {new:true}) 
        if (!req.params.id) { //this check the id is correct or not
            return res.status(404).send;
        }
        res.json(updatenotes)
            } catch (error) {
                     console.error(error.message);
                    res.status(500).send("some internal server error occured");
             }
    })

    // Another way to upadte news this way of code to update notes is commented 
    // router.patch("/api/notes/updatenotes/:id", fetchUser,
    // async (req, res) => {
        
    //         // const { title, description, tag } = req.body;
    //         const title = req.body.title ;
    //         const description = req.body.description ;
    //         const tag = req.body.tag ;
           
    //         //create a new object 
    //         const newNote = {} //this is blank object
    //         if(title){
    //             newNote.title = title
    //         }
    //         if(description){
    //             newNote.description = description
    //         }
    //         if(tag){
    //             newNote.tag = tag
    //         }
            
    //         let note = await Notes.findById(req.params.id);
    //         if(!note){
    //             return res.status(404).send("Not Allowed");
    //         }
    //         if(note.user.toString() !== req.user.id){
    //             return res.status(404).send("Not Allowed");
    //         }
    //        const  updatenotes = await Notes.findByIdAndUpdate(req.params.id ,{$set : newNote}, {new:true}) 
    //     if (!req.params.id) {
    //         return res.status(404).send;
    //     }
        
    //     res.json(updatenotes)
    //     // } catch (error) {
    //     //     console.error(error.message);
    //     //     res.status(500).send("some internal server error occured");
    //     // }
    // })


    //Route 4:- Delete a notes using Patch or Put  {Login required}

    router.delete("/api/notes/deletenotes/:id", fetchUser,
    async (req, res) => {
        try {
 
            let note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not Allowed");
            }
            if(note.user.toString() !== req.user.id){ // this check that user wanted to updated only his/her notes 
                return res.status(404).send("Not Allowed");
            }
            const id = req.params.id;
            const deletenotes = await Notes.findByIdAndDelete(id);
            if (!id) {
                return res.status(404).send();
            }  
            res.json({"SUCCESS" :"note has been deleted" , deletenotes }) //this is in json format  , as we can write deletenotes : deletenotes in place of deletenotes but here value and key is same so we write only value or key and both way is correct

        } catch (error) {  
            console.error(error.message);
            res.status(500).send("some internal server error occured");
        }
    })


    module.exports = router