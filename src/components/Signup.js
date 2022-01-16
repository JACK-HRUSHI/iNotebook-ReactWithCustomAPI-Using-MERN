import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useHistory is now replaced by useNavigate

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate(); // useHistory is now replaced by useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();
      if (json.success) {
        //Save the auth-token & redirect user to his/her notes
        localStorage.setItem("token", json.authtoken);
        // history.push('/');
        setCredentials({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        navigate("/login"); // replace history.push('/') with navigate('/')
        props.showAlert("Account Created Successfully ", "success");
      } else {
        props.showAlert("Invalid Details", "danger");
        setCredentials({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    } else {
      // alert("Password and Confirm Password Should be same");
      props.showAlert("Password and Confirm Password Should be same", "danger");
      setCredentials({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="text-center ">
        <strong> Sign Up </strong>
      </h2>
      <h6 className="text-center my-2">Create an account to use iNotebook</h6>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            placeholder="Enter your name here"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            placeholder="Enter your password here"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button
          // disabled={credentials.password < 5 || credentials.cpassword < 5}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
