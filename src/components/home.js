// import { CircularProgress } from "@mui/material";
// import React, {useState} from "react";
// const [isloading, setloading] = useState(false);

  // const handlefindID = () => {
  //   setloading(true)
  //   setTimeout(() => {
  //     setloading(false)
  //     history('./findbyid')
  //   }, 100);
  // };

import React from "react";

import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const history = useNavigate();


  const handleLogin = () => {
    history("/login");
  };

  const handleRegister = () => {
    history("/register");
  };


  return (
    <div class="App-header">
      <h1 class="mb-5">Welcome To Auth Page</h1>
      <div class="g-3 change">
        <div class="col-auto vl marginALL">
          <h3>login if you have already registered.</h3>
          <button
            type="submit"
            class="btn btn-primary mb-3 btn-lg"
            onClick={handleLogin}
            style={{ maxWidth: "50%" }}
          >
            LOGIN
          </button>
        </div>
        <div class="col-auto vl marginALL">
          <h3>Register if you're not already.</h3>
          <button
            type="submit"
            class="btn btn-primary mb-3 btn-lg"
            onClick={handleRegister}
          >
            REGISTER
          </button>
        </div>
      </div>
      {/* <form class="g-3">
        <div class="col-auto" id="staticID">
          <h3>Click to find user by id.</h3>
        </div>
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary mb-3 btn-lg"
            onClick={() => handlefindID()}
          >
            {isloading ? (
              <>
                <CircularProgress style={{ color: "white" }} size={20} />
              </>
            ) : (
              <>
                <span>Find User</span>
              </>
            )}
          </button> */}
        {/* </div>
      </form> */}
    </div>
  );
};

export default Home;
