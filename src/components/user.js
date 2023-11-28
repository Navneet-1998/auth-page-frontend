import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import "./user.css";
import Navbar from "./navbar";

const User = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("data");
  const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
  const userData = data.user;
  const history = useNavigate();

  const update = () => {
    history(`/update?data=${encodeURIComponent(JSON.stringify(userData))}`);
  };

  return (
   <>
   <Navbar routing="Login"/>
    <div class="App-header">
      <h1 class="mb-4">User Information:</h1>
      <Box>
      <div class="container">
        <div class="mb-3 ">
          <label for="staticID" class="form-label">
            ID :
          </label>
          <div class="ms-3" style={{ color: "white" }}>
            <input
              type="text"
              readonly
              class="form-control-plaintext text-center"
              style={{ color: "white", width:"110%" }}
              id="staticID"
              value={data.user._id}
            ></input>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="staticName" class="form-label">
            NAME :
          </label>
            <input
              type="text"
              readonly
              class="form-control-plaintext text-center"
              style={{ color: "white" }}
              id="staticName"
              value={data.user.name}
            ></input>
        </div>

        <div class="mb-3 row  text-center">
          <label for="staticEmail" class="form-label">
            Email :
          </label>
            <input
              type="text"
              readonly
              class="form-control-plaintext text-center"
              style={{ color: "white" }}
              id="staticEmail"
              value={data.user.email}
            ></input>
        </div>

        <div class="mb-3 row">
          <label for="staticPassword" class="form-label">
            PASSWORD :
          </label>
            <input
              type="text"
              readonly
              class="form-control-plaintext text-center"
              style={{ color: "white" }}
              id="staticPassword"
              value={data.password}
            ></input>
        </div>
      </div>
      </Box>

      <div class="col-auto">
        <button
          type="submit"
          class="btn btn-primary mt-3 btn-lg"
          onClick={() => update()}
        >
          Vist To Update Page
        </button>
      </div>
    </div>
   </>
  );
};

export default User;
