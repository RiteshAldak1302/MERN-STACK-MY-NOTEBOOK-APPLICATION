import React from 'react'
import NoteItem from "./NoteItem"
import AddNote from './AddNote';
import { useContext, useEffect ,useRef ,useState } from "react";
import noteContext from "../context/notes/noteContext"
import { useHistory } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes ,getNotes ,editNote} = context ;
    let history = useHistory();
    //this useeffect is used to fetch all notes 
    useEffect(() => {
      if(localStorage.getItem('token')){ 
         getNotes()
      }else{
        history.push("/login")
      }
        
    //    eslint-disable-next-line
         }, [])
         
         const [note, setNote] = useState({id:"" ,etitle:"",edescription:"",etag:""})
         const ref = useRef(null)
         const refclose = useRef(null)
         const updateNote =(currentNote)=>{
           ref.current.click()
           setNote({ id:currentNote._id,etitle : currentNote.title, edescription : currentNote.description , etag : currentNote.tag})
        
         }


         const handleOnClick=(e)=>{
            editNote(note.id , note.etitle , note.edescription ,note.etag)
            refclose.current.click()
          
         }
         const onChange=(e)=>{
             setNote({...note, [e.target.name] : e.target.value})
     
         }
          

    return (
        <>
        <AddNote/>
       
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3" >
        <div className="mb-2" > 
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="etext"  value={note.etitle}
            className="form-control"
            name="etitle"
            id="etitle" onChange={onChange}
            aria-describedby="emailHelp" minLength={3} required
          />
        </div>
        <div className="mb-3" >
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="edescription"
            id="edescription" onChange={onChange} value={note.edescription} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            name="eiag"
            id="etag" onChange={onChange} value={note.etag}
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button"  ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5|| note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="container">
        <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
        </>
    )
}

export default Notes
