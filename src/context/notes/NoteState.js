import NoteContext from "./noteContext";
import { useState } from "react";
// import { Context } from "react";
const host = "http://localhost:5000"
// here we create state which is used by noteContext (context api) , then this state can be used by any component at any where

const NoteState = (props) => {
    const noteInitial = []

    const [notes, setNotes] = useState(noteInitial);
    // get all notes
const getNotes = async (title, description ,tag) => {
          
        const response = await fetch(`${host}/api/notes/fetchallnotes`, { 
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'authtoken' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MmYyYjJmZjRmY2FjYzJmYjZmN2MwIn0sImlhdCI6MTYzNjE4NzQ3NH0._QsKf0Fh2rtD9TZ9vbq7_s2d3t8BAmu8N-6LHt2d3V8'
            }
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
          console.log(json)
          setNotes(json)
       
        }
        
    
    
    
    
    
    
    //logic to add a note in client side ( front end ) but also we have to write code to added or delete and edit  a note in backend ( database )
    const addNote = async (title, description ,tag) => {
          
        const response = await fetch(`${host}/api/notes/addnotes`, { 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'authtoken' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MmYyYjJmZjRmY2FjYzJmYjZmN2MwIn0sImlhdCI6MTYzNjE4NzQ3NH0._QsKf0Fh2rtD9TZ9vbq7_s2d3t8BAmu8N-6LHt2d3V8'
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const note = await response.json(); // parses JSON response into native JavaScript objects
          setNotes(notes.concat(note))       //push is the method which is used to update the note in the array but here we concat wihch  add a new array
        
     };
     // logic to delete a note in client side ( front end ) but also we have to write code to added or delete and edit  a note in backend ( database )
    const  deleteNote = async (id) => { 

        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, { 
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'authtoken' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MmYyYjJmZjRmY2FjYzJmYjZmN2MwIn0sImlhdCI6MTYzNjE4NzQ3NH0._QsKf0Fh2rtD9TZ9vbq7_s2d3t8BAmu8N-6LHt2d3V8'
            },
            //In delete , body is not required becoz here we not add or update or fetch any note .  
            // body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const json = response.json(); // parses JSON response into native JavaScript objects
          console.log(json)

        // console.log("delete the note of this id : " + id) 
        const newNotes = notes.filter((note)=>{
            return note._id !== id 
        })
        setNotes(newNotes)
    };

    //  we call API to add , edit and delete note in database ( backend )



    //logic to edit a note in client side ( front end ) but also we have to write code to added or delete and edit  a note in backend ( database )
    const editNote = async (id,title,description,tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, { 
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'authtoken' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MmYyYjJmZjRmY2FjYzJmYjZmN2MwIn0sImlhdCI6MTYzNjE4NzQ3NH0._QsKf0Fh2rtD9TZ9vbq7_s2d3t8BAmu8N-6LHt2d3V8'
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const json = response.json(); // parses JSON response into native JavaScript objects
          console.log(json)
        
        let newNotes = JSON.parse(JSON.stringify(notes))
         //logic to edit a note
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){ 
                newNotes[index].title = title 
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
           setNotes(newNotes)
     };
    return (
        // context mein notes, editNote, deleteNote and addNote function ja raha h
        <NoteContext.Provider value={{ notes ,editNote ,deleteNote ,addNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteState;
