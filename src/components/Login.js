import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useHistory is now replaced by useNavigate

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // let history = useNavigate();
  let navigate = useNavigate(); // useHistory is now replaced by useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the auth-token & redirect user to his/her notes
      localStorage.setItem("token", json.authtoken);
      // history.push('/');
      setCredentials({ email: "", password: "" });
      navigate("/"); // replace history.push('/') with navigate('/')
      props.showAlert("Logged in Successfully ", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setCredentials({ email: "", password: "" });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="text-center my-2">
        <strong> Login </strong>
      </h2>
      <h6 className="text-center my-2">Login to continue to use iNotebook</h6>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Enter your email here"
            onChange={onChange}
            required
            // aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Enter your password here"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
