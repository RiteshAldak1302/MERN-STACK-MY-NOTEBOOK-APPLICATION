import NoteContext from "./noteContext";
import { useState } from "react";
// import { Context } from "react";


// here we create state which is used by noteContext (context api) , then this state can be used by any component at any where 

const NoteState = (props) =>{

    const noteInitial= [
        {
      "_id": "61867fd825a4cafe6ceb16a7",
      "user": "6182f2b2ff4fcacc2fb6f7c0",
      "title": "practice on english fluency",
      "description": "i have to do lot of practice on speaking english ",
      "tag": "personal",
      "__v": 0
    },
    {
        "_id": "61867fd825a4cafe6ceb16a9",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "coding",
        "description": "i have to do lot of practice on DS-Algo",
        "tag": "personal",
        "__v": 0
    },
    {
        "_id": "61867fd925a4cafe6ceb16ab",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "coding",
        "description": "i have to do lot of practice on DS-Algo",
        "tag": "personal",
        "__v": 0
    },
    {
        "_id": "61878c9119c52d7b2922be0d",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "typing practice",
        "description": "i have spend one hour on typing practice",
        "tag": "personal",
        "__v": 0
    }
    ,
    {
        "_id": "61878c9119c52d7b2922be0d",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "typing practice",
        "description": "i have spend one hour on typing practice",
        "tag": "personal",
        "__v": 0
    }
    ,
    {
        "_id": "61878c9119c52d7b2922be0d",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "typing practice",
        "description": "i have spend one hour on typing practice",
        "tag": "personal",
        "__v": 0
    }
    ,
    {
        "_id": "61878c9119c52d7b2922be0d",
        "user": "6182f2b2ff4fcacc2fb6f7c0",
        "title": "typing practice",
        "description": "i have spend one hour on typing practice",
        "tag": "personal",
        "__v": 0
    }
  ]
  
  const [notes, setNotes] = useState(noteInitial)
  return (
      // context me notes and setNotes ja raha h 
      <NoteContext.Provider value={{notes , setNotes}}>  
            {props.children} 
        </NoteContext.Provider>
    )
}
export default  NoteState ;