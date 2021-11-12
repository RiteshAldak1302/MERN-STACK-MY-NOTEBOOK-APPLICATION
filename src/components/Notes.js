import React from 'react'
import NoteItem from "./NoteItem"
import AddNote from './AddNote';
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext"

const Notes = () => {
    const context = useContext(noteContext)
    const { notes ,getNotes} = context ;
    //this useeffect is used to fetch all notes 
    useEffect(() => {
        getNotes()
         }, [])
    return (
        <>
        <AddNote/>
        <div className="container">
        <div className="row my-3">
        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note}/> ;
        })}
        </div>
        </div>
        </>
    )
}

export default Notes
