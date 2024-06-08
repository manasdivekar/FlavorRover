import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../url";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jsonRes = await response.json();
    console.log(jsonRes);

    if (!jsonRes.success) {
      alert("Enter Valid Credentials!!");
    }
    if (jsonRes.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", jsonRes.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const changeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label m-3">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={changeCredentials}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label m-3">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={changeCredentials}
            />
          </div>

          <button type="submit" onClick={handleSubmit} className=" m-3 btn btn-success">
            Submit
          </button>

          <Link to="/createUser" className="m-3 btn btn-danger">
            New User!!
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
