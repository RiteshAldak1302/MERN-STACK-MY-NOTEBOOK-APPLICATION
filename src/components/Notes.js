import React from 'react'
import { useContext  } from "react";
import noteContext from "../context/notes/noteContext"
import NoteItem from "./NoteItem"

const Notes = () => {
    const context = useContext(noteContext)
    const { notes , setNotes} = context 
    return (
        <div className="container">
        <div className="row my-3">
      <h1>Add a Note</h1>
      
        {notes.map((note)=>{
            return <NoteItem note={note}/> ;
        })}
        </div>
        </div>
    )
}

export default Notes
