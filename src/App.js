import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EntryPoint from "./components/EntryPoint";
import Courses from "./components/Courses";
import Course from "./components/Course";
import AboutUs from "./components/AboutUs";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<EntryPoint />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
