import React from "react";
import { useState } from "react";
import Base from "../../core/base/Base";
import "./Form.css";
import { signup } from "../../auth/helper";
import { Link } from "react-router-dom";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;
  const handleChange = (field) => (event) => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            naem: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const onSuccess = () => {
    return (
      <div className="onSuccess" style={{ display: success ? "" : "none" }}>
        Account created !!!{"      "}
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/signin"
        >
          Log In here
        </Link>
      </div>
    );
  };
  const onFailure = () => {
    return (
      <div className="onFailure" style={{ display: error ? "" : "none" }}>
        {error}
      </div>
    );
  };

  const Form = () => {
    return (
      <div className="form">
        <div className="form_fields">
          <label>Name</label>
          <input onChange={handleChange("name")} type="text" value={name} />
        </div>
        <div className="form_fields">
          <label>E mail</label>
          <input onChange={handleChange("email")} type="text" value={email} />
        </div>
        <div className="form_fields">
          <label>Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            value={password}
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  };
  return (
    <Base heading="Sign Up" description="Sign up if you are new user">
      {onFailure()}
      {Form()}
      {onSuccess()}
    </Base>
  );
};
export default Signup;
