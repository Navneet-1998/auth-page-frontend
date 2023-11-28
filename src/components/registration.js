import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import { useNavigate} from "react-router-dom";
import Navbar from "./navbar";

const Register = () => {
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
  const [registerData, getRegisterData] = useState(formData);
  const [isloading, setloading] = useState(false);
  const [confirm, getComfirmed] = useState(check);

  const handleComfirmPassword = (e) => {
    const value = e.target.value;
    getComfirmed((prevData) => ({
      ...prevData,
      confirmPassword: value,
    }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    getRegisterData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    getRegisterData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    getRegisterData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const register = async () => {
    if(validateInput(data)){
      setloading(true)
      await axios.post(config.endpoint+"/auth/register", {name:registerData.name,email:registerData.email,password:registerData.password})
      .then(function (response) {
        console.log(response)
        if(response && response.status === 201){
        setloading(false)
        enqueueSnackbar("Registered Successfully",{variant: "success" })
        history("/login")
        }
      })
      .catch(function (error) {
        setloading(false)
        if(error.response && (error.response.status === 403 || error.response.status === 404) ){
          enqueueSnackbar(error.response.data.message,{variant: "error" })
        }else{
          enqueueSnackbar("Something went wrong, Check that the backend is running, reachable and return valid JSON.",{ variant: "error" })
        }
      });
    }
  };

  const data = {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
  };
  
  const validateInput = (data) => {
    if(data.name === ""){
      enqueueSnackbar("name is a required field",{variant: "warning" })
      return false;
    }else if(data.name.length < 6){
      enqueueSnackbar("name must be at least 6 characters",{variant: "warning" })
      return false;
    }else if(data.email === ""){
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
    }else if(confirm.confirmPassword.length === 0 || confirm.confirmPassword !== data.password){
      enqueueSnackbar("Password Does not match", {
        variant: "warning",
      });
      return false;
    }

    return true
  };


  return (
    <>
    <Navbar routing="Login"/>
    <div class="App-header ">
      <h1>Register PAGE</h1>
      <div class="g-3 align-items-center">
        <div class="col-auto">
          <label for="inputName" class="col-form-label">
            Enter Your Name
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="inputName"
            class="form-control"
            onChange={(e) => handleNameChange(e)}
            aria-describedby="passwordHelpInline"
          ></input>
        </div>
        <div class="col-auto">
          <label for="inputRegisterEmail" class="col-form-label">
            Email Address
          </label>
        </div>
        <div class="col-auto">
          <input
            type="email"
            id="inputRegisterEmail"
            class="form-control"
            onChange={(e) => handleEmailChange(e)}
            aria-describedby="passwordHelpInline"
          ></input>
        </div>
        <div class="col-auto">
          <label for="inputRegisterPassword" class="col-form-label">
            Password
          </label>
        </div>
        <div class="col-auto">
          <input
            type="password"
            id="inputRegisterPassword"
            class="form-control"
            onChange={(e) => handlePasswordChange(e)}
            aria-describedby="passwordHelpInline"
          ></input>
        </div>
        <div class="col-auto">
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

        <div class="col-auto my-4">
          <button type="submit" class="btn btn-primary mb-3 btn-lg" onClick={() => register()}>
          {isloading ? <><CircularProgress style={{color: "white"}} size={20} /></> : <><span>REGISTER NOW</span></> }
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
