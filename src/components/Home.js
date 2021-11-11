import React from "react";

import Notes from "./Notes";

const Home = () => {
    
  return (
      <>
      <form className="  my-3" style={{"width":"65rem"}}>
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
     
      <Notes/>
      </>
  );
};

export default Home;
