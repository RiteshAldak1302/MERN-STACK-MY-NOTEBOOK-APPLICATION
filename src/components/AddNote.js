import React from 'react'
import { useContext ,useState  } from "react";
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote} = context ;

    const [note, setNote] = useState({title:"",description:"",tag:"default"})

    const handleOnClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description ,note.tag)
      setNote({title:"",description:"",tag:""})

    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value})

    }
    return (
        <div>
           <div className="container">
      <h1>Add a Note</h1>
      <form className="my-3" style={{"width":"65rem"}}>
        <div className="mb-2"> 
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title" onChange={onChange}
            aria-describedby="emailHelp" minLength={3} required value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description" onChange={onChange} minLength={5} required value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            name="tag"
            id="tag" onChange={onChange} value={note.tag}
          />
        </div>
       
        <button disabled={note.title.length<5|| note.description.length<5 } type="submit" onClick={handleOnClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
      </div> 
        </div>
    )
}

export default AddNote
