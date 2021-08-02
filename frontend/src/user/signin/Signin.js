import React, { useState } from "react";
import Base from "../../core/base/Base";
import "./Form.css";
import { signin, authenticate, isAuthenticated } from "../../auth/helper/index";
import { Link, Redirect } from "react-router-dom";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = (field) => (event) => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Signin Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin dashboard</p>;
      } else {
        <p>Redirect to user dashboard</p>;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="onSuccess">
          <h2 style={{ color: "white" }}>Loading.....</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
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
          <label>E mail</label>
          <input onChange={handleChange("email")} value={email} type="text" />
        </div>
        <div className="form_fields">
          <label>Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
          />
        </div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  };

  return (
    <Base heading="Sign in" description="Welcome back">
      {errorMessage()}
      {Form()}
      {loadingMessage()}
      {performRedirect()}
    </Base>
  );
};
export default Signin;
