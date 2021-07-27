import React from "react";
import Base from "../../core/base/Base";
import "./Form.css";
const Signup = () => {
  const Form = () => {
    return (
      <div className="form">
        <div className="form_fields">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="form_fields">
          <label>E mail</label>
          <input type="text" />
        </div>
        <div className="form_fields">
          <label>Password</label>
          <input type="password" />
        </div>
        <button>Submit</button>
      </div>
    );
  };
  return (
    <Base heading="Sign Up" description="Sign up if you are new user">
      <Form />
    </Base>
  );
};
export default Signup;
