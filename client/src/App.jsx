import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./header/Header";
import Home from "./home/Home";
import Diaries from "./diaries/Diaries";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import AddPost from "./add/AddPost";
import DiaryUpdate from "./diaries/DiaryUpdate";

function App() {
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/diaries" element={<Diaries />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add" element={<AddPost />} />
              <Route path="/post/:id" element={<DiaryUpdate />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/diaries" element={<Diaries />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
