import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { ShoppingCart } from "@mui/icons-material";

function Navbar() {

  
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const navigate = useNavigate();

  const handleLogoutFunct = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true)
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            FlavorRover
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link mx-4"
                    aria-current="page"
                    to="/"
                    style={{ color: "white", fontSize: "1.3rem" }}
                  >
                    Home
                  </Link>
                </li>

                {/* how to display myorders after logging into the website  logic used is by accessing the auth token which we have generated and stored in local storage */}

                {localStorage.getItem("authToken") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/myOrder"
                      style={{ color: "white", fontSize: "1.3rem" }}
                    >
                      MyOrders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {/* Building a logic to see login in and sign in when user is logged out */}
              {!localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link className="btn bg-white text-success m-2" to="/login">
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success m-2"
                    to="/createUser"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="btn bg-white text-success m-2" onClick={loadCart}>
                    Cart{"   "}
                    <Badge pill bg="danger" style={{height:"30px"}}>
                      <ShoppingCart/>
                    </Badge>
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                  <div
                    className="btn bg-danger text-white m-2"
                    onClick={handleLogoutFunct}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
