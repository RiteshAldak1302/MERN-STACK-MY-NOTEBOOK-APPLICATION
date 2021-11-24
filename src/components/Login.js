import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom' //useHistory is imported from react-router-dom


const Login = (props) => {
      const [credentials, setCredentials] = useState({email :'' , password : ''})
  
    let history = useHistory() // here we use useHistory hook

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, { 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },body : JSON.stringify({email :credentials.email , password: credentials.password})
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
          console.log(json)
          if(json.success){
            //save the authtoken and redirect 
            localStorage.setItem('token',json.authtoken); //here we save the token from specific user
            history.push("/")   // after login it will redirect to the home page
            props.showAlert("Logged In Successfully", "success")
          }
          else{
            // props.alert("invalid credentials")
            props.showAlert("invalid credentials", "danger")
          }
    }

    const onChange=(e)=>{
      setCredentials({...credentials, [e.target.name] : e.target.value})

  }

    return (
        <>
         <form onSubmit={handleOnSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" value={credentials.email} className="form-control"  onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" value={credentials.password} className="form-control" onChange={onChange} name="password" id="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary"  >Submit</button>
</form>
        </>
    )
}

export default Login
