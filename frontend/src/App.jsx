import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import CaptionSignup from "./pages/captionSignup";
import UserSignup from "./pages/UserSignup";
import CaptionLogin from "./pages/CaptionLogin";

const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/login" element ={<UserLogin/>}/>
        <Route path="/signup" element ={<UserSignup/>}/>
        <Route path="/caption-login" element ={<CaptionLogin/>}/>
        <Route path="/caption-signup" element ={<CaptionSignup/>}/>
      </Routes>
    </div>
  )
}

export default App