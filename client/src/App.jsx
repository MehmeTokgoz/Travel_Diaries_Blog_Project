import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./header/Header";
import Home from "./home/Home";
import Diaries from "./diaries/Diaries";
import Login from "./auth/Login";

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
        </Routes>
      </section>
    </div>
  );
}

export default App;
