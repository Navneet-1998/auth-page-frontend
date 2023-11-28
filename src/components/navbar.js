import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({routing}) {
    const history = useNavigate();


    const handleHome = () => {
      history("/");
    };
  
    const handleSigning = () => {
      history(`/${routing.toLowerCase()}`);
    };
  
  return (
    <>
      <div class="header ">
        <nav class="navbar navbar-expand-md bg-body-tertiary ">
          <div class="container w-100">
            <a
              class="navbar-brand fw-bold fs-4"
              href="##"
              style={{ cursor: "default" }}
            >
              Auth Page
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse "  id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end checking-out" style={{width:"120%"}}>
                <li class="nav-item">
                  <button class="btn btn-primary mx-2 fw-bold" onClick={handleHome}>Home</button>
                </li>
                <li class="nav-item">
                  <button class="btn btn-primary mx-2 fw-bold" onClick={handleSigning}>{routing}</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
