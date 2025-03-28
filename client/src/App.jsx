import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthStore } from "./store/AuthStore";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Logout from "./components/Logout";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AddCourse from "./components/AddCourse";
import MyCourse from "./components/MyCourse";
import Success from "./pages/Success";
import MyEnrollments from "./pages/MyEnrollments";
import Video from "./components/Video";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const { role } = AuthStore();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={role === "teacher" ? <Dashboard /> : <Home />}
          />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/not_found" element={<NotFound />} />
          <Route path="/add_course" element={<AddCourse />} />
          <Route path="/my_course" element={<MyCourse />} />
          <Route path="/success" element={<Success />} />
          <Route path="/my_enrollment" element={<MyEnrollments />} />
          <Route path="/preview/:id" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
