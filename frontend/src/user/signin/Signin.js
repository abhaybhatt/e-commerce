import React from "react";
import Base from "../../core/base/Base";
import "./Form.css";

const Signin = () => {
  const Form = () => {
    return (
      <div className="form">
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
    <Base heading="Sign in" description="Welcome back">
      <Form />
    </Base>
  );
};
export default Signin;
