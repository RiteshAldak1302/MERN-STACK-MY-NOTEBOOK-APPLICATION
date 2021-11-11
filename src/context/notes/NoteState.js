import NoteContext from "./noteContext";



// here we create state which is used by noteContext (context api) , then this state can be used by any component at any where 

const NoteState = (props) =>{
   

    return (
        <NoteContext.Provider value={[]}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default  NoteState ;