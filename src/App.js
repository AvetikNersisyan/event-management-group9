import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
import Events from "./components/events";
import Header from "./components/header/header";
import SignUp from "./components/profile/signUp";
import React from "react";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/events"} element={<Events/>}/>
                <Route path={"*"} element={<div> error 404</div>}/>
                <Route path={"profile/signup"} element={<SignUp/>}/>
                <Route path={"/profile//*"} element={<Profile/>}/>

            </Routes>
        </div>
    );
}

export default App;
