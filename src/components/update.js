import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import { useNavigate,useLocation } from "react-router-dom";
import "./update.css";
import Navbar from "./navbar";

const Update = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("data");
  const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formData = {
    name: "",
    email: "",
    password: "",
  };

  const check = {
    confirmPassword : ""
  }
  const [upadateData, getupadateData] = useState(formData);
  const [confirm, getComfirmed] = useState(check);
  const [isloading, setloading] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    getupadateData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleComfirmPassword = (e) => {
    const value = e.target.value;
    getComfirmed((prevData) => ({
      ...prevData,
      confirmPassword: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    getupadateData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const update = async () => {
    if (validateInput(newData)) {
      setloading(true);
      await axios
        .put(config.endpoint + "/user/"+data._id, {
          name: upadateData.name,
          password: upadateData.password,
        })
        .then(function(response) {
          if (response && response.status === 200) {
            setloading(false);
            enqueueSnackbar("Updated Successfully", { variant: "success" });
            history("/login");
          }
        })
        .catch(function(error) {
          setloading(false);
          if (
            error.response &&
            (error.response.status === 403 || error.response.status === 404)
          ) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar(
              "Something went wrong, Check that the backend is running, reachable and return valid JSON.",
              { variant: "error" }
            );
          }
        });
    }
  };

  const newData = {
    name: upadateData.name,
    password: upadateData.password,
  };

  const validateInput = (data) => {
    if (data.name === "") {
      enqueueSnackbar("name is a required field", { variant: "warning" });
      return false;
    } else if (data.name.length < 6) {
      enqueueSnackbar("name must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }else if(confirm.confirmPassword.length === 0 || confirm.confirmPassword !== data.password){
      enqueueSnackbar("Password Does not match", {
        variant: "warning",
      });
      return false;
    }

    return true;
  };

  return (
    <>
    <Navbar routing="Login"/>
    <div class="App-header">
        <h1 style={{fontSize:'400%'}} id="responsive">Update Page</h1>
      <div class="g-3 align-items-center my-4">
        <h2 style={{fontSize:'200%'}}>Update Your Data:</h2>
       <div class="col auto my-4 ">
          <label for="inputName" class="col-form-label">
            Update Your Name :
          </label>
          <div class=" d-flex justify-content-center">
          <input
            type="text"
            id="inputName"
            class="form-control"
            style={{width:"80%"}}
            onChange={(e) => handleNameChange(e)}
          ></input>
          </div>
        </div>
        <div class="col-auto my-4">
          <label for="inputRegisterPassword" class="col-form-label">
          Update Your Password :
          </label>
              <div class=" d-flex justify-content-center">
          <input
            type="password"
            id="inputRegisterPassword"
            class="form-control"
            onChange={(e) => handlePasswordChange(e)}
            style={{width:"80%"}}
          ></input>
          </div>
          <span
            id="passwordHelpInline"
            class="form-text"
            style={{ color: "#786e69" }}
          >
            Must be 5-20 characters long
          </span>
        </div>
       <div class="col-auto">
          <label for="inputConfirmPassword" class="col-form-label">
          Confrim Your Password :
          </label>
              <div class=" d-flex justify-content-center">
          <input
            type="password"
            id="inputConfirmPassword"
            class="form-control"
            onChange={(e) => handleComfirmPassword(e)}
            style={{width:"80%"}}
          ></input>
          </div>
          <span
            id="passwordHelpInline"
            class="form-text"
            style={{ color: "#786e69" }}
          >
                 Please Confirm Password 
          </span>
        </div>
       </div>

       
       
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary my-3 btn-lg "
            onClick={() => update()}
          >
            {isloading ? (
              <>
                <CircularProgress style={{ color: "white" }} size={20} />
              </>
            ) : (
              <>
                <span>Upadate</span>
              </>
            )}
          </button>
        </div>
        </div>
    </>
  );
};

export default Update;
