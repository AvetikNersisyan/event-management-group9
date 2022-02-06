import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
import Events from "./components/events";
import Header from "./components/header/header";
import Categories from "./components/categories";
import { useEffect } from "react";
import { fetchData } from "./redux/ducks/eventDuck";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./redux/userDuck";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((res) => dispatch(setLoggedInUser(res)));

    // fake user, to be deleted later
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/events"} element={<Events />} />
        <Route path={"/categories"} element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
