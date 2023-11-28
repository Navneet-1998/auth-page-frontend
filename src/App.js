import React from "react";
import Login from "./components/login";
import Register from "./components/registration";
import Update from "./components/update";
import Home from "./components/home";
import User from "./components/user";
import Navbar from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

export const config = {
  endpoint: `https://auth-page-backend.onrender.com/api`,
};

function App() {
  return (
    <div className="App">
      <header>
        <SnackbarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} exact/>
              <Route path="/user" element={<User />} />
              <Route path="/update" element={<Update />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/navbar" element={<Navbar />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </header>
    </div>
  );
}

export default App;
