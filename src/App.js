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
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/events"} element={<Events/>}/>
                <Route
                    path={"/signup"}
                    element={<SignUp/>}/>
            </Routes>
        </div>
    );
}

export default App;
