import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext"


const NoteItem = (props) => {
  const note = props.note;
  const context = useContext(noteContext)
    const { editNote , deleteNote} = context ;
  return (
    <>
      <div className="col-md-3 mx-3 my-3" >
        <div className="card ">
          <div className="card-body">
              <div className="d-flex align-items-center"> 
            <h5 className="card-title">{note.title}</h5> 
            <i className="fas fa-trash-alt mx-2 my-2" style={{"color":"red"}} onClick={()=>{deleteNote(note._id)}}></i>
     <i className="fas fa-edit mx-2 my-2" onClick={editNote} style={{"color":"blue"}}></i>
     </div>
            <p className="card-text"> {note.description} </p>
          </div>
     
        </div>
      </div>
    </>
  );
};

export default NoteItem;
