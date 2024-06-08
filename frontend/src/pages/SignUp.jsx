import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../url";

const SignUp = () => {
  const navigator = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const jsonRes = await response.json();
    console.log("res of signup:",jsonRes);

    if (!jsonRes.success) {
      alert("Enter Valid Credentials!!");
    }
    navigator("/login")
  };

  const changeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label m-3">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credentials.name}
              onChange={changeCredentials}
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label m-3 ">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={changeCredentials}
            />
          </div>

          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>

          <Link to="/login" className="m-3 btn btn-danger">
            Already A User!!
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
