import React from "react";

const NoteItem = (props) => {
  const note = props.note;
  return (
    <>
      <div className="col-md-3 mx-1 my-3"style={{border:"1px solid rgba(0, 0, 0, 0.1)"}} >
        <div clasName="card ">
          <div clasName="card-body">
            <h5 clasName="card-title">{note.title}</h5>
            <p clasName="card-text"> {note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam velit laudantium, a officiis accusamus magnam iure, eum dolorum nulla assumenda dolore. Voluptatum debitis esse possimus autem sed error inventore molestiae alias at nihil?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
