import React from 'react'
import { useContext ,useState  } from "react";
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote} = context ;

    const [note, setNote] = useState({title:"",description:"",tag:"default"})

    const handleOnClick=(e)=>{
      e.preventDefault();
      console.log("adding a note")
      addNote(note.title,note.description ,note.tag)
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
            aria-describedby="emailHelp"
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
            id="description" onChange={onChange}
          />
        </div>
        {/* <div class="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1" 
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" onClick={handleOnClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
      </div> 
        </div>
    )
}

export default AddNote
