import React from "react";

const Alert = (props) => {
  return (
    <>
     <div className="alert alert-danger" role="alert">
   {props.message}
</div>
    </>
  );
};

export default Alert;
