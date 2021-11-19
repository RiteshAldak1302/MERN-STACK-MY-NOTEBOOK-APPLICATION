import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {

    const [credentials, setCredentials] = useState({name:"",email :'' , password : ''})
  
    let history = useHistory() // here we use useHistory hook

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials 
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, { 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },body : JSON.stringify({name ,email,password})
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
          console.log(json)
         
            //save the authtoken and redirect 
            localStorage.setItem('token',json.authtoken);
            history.push("/")   // after login it will redirect to the home page
         
    }

    const onChange=(e)=>{
      setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleOnSubmit} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text"  className="form-control"  onChange={onChange} name="name" id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email"  className="form-control"  onChange={onChange} name="email" id="email" aria-describedby="emailHelp" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password"  className="form-control" onChange={onChange} name="password" id="Password" minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary"  >Submit</button>
</form>
        </div>
    )
}

export default Signup
