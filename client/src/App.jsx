import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./header/Header";
import Home from "./home/Home";
import Diaries from "./diaries/Diaries";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import AddPost from "./add/AddPost";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>

      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element = {<AddPost/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
