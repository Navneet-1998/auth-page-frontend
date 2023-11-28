import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar  } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import { useNavigate} from "react-router-dom";
import Navbar from "./navbar";

const Login = () => {
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const formData = {
    email : "",
    password : ""
  }

  const [loginData, getLoginData] = useState(formData);
  const [isloading, setloading] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    getLoginData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    getLoginData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const login = async () => {
    if(validateInput(data)){
      setloading(true)
      await axios.post(config.endpoint+"/auth/login", {email:loginData.email,password:loginData.password})
      .then(function (response) {
        if(response && response.status === 200){
        setloading(false)
        const updateData = {
          ...response.data,  // Copy the properties from response.data
          password: loginData.password,
      };
        enqueueSnackbar("Logged In Successfully",{variant: "success" })
        history(`/user?data=${encodeURIComponent(JSON.stringify(updateData))}`);
        }
      })
      .catch(function (error) {
        setloading(false)
        if(error.response && error.response.status === 401 ){
          enqueueSnackbar(error.response.data.message,{variant: "error" })
        }else{
          enqueueSnackbar("Something went wrong, Check that the backend is running, reachable and return valid JSON.",{ variant: "error" })
        }
      });
    }
    };
  
    const data = {
      email : loginData.email,
      password : loginData.password
    }
  
    const validateInput = (data) => {
      if(data.email === ""){
        enqueueSnackbar("email is a required field",{variant: "warning" })
        return false;
      }else if(data.email.length < 6){
        enqueueSnackbar("email must be at least 6 characters",{variant: "warning" })
        return false;
      }else if(data.password === ""){
        enqueueSnackbar("Password is a required field",{variant: "warning" })
        return false;
      }else if(data.password.length < 6){
        enqueueSnackbar("Password must be at least 6 characters",{variant: "warning" })
        return false;
      }
      return true;
    };

  return (
   <>
      <Navbar routing="Register"/>
    <div class="App-header ">
    <h1>
        LOGIN PAGE
    </h1>
      <div class="g-3 align-items-center">
      <div class="col-auto">
          <label for="inputEmail" class="col-form-label">
                Email Address
          </label>
        </div>
        <div class="col-auto">
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            onChange={(e) => handleEmailChange(e, data)}
            aria-describedby="passwordHelpInline"
          ></input>
        </div>
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">
            Password
          </label>
        </div>
        <div class="col-auto">
          <input
            type="password"
            id="inputPassword6"
            class="form-control"
            onChange={(e) => handlePasswordChange(e,data)}
            aria-describedby="passwordHelpInline"
          ></input>
        </div>
        <div class="col-auto my-4">
          <button type="submit" class="btn btn-primary mb-3 btn-lg" onClick={() => login()}>
          {isloading ? <><CircularProgress style={{color: "white"}} size={20} /></> : <><span>LOGIN TO AUTH PAGE</span></> } 
          </button>
        </div>
      </div>
    </div></>
  );
};

export default Login;
