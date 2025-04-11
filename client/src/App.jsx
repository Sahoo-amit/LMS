import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthStore } from "./store/AuthStore";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Logout from "./components/Logout";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";
import AddCourse from "./components/AddCourse";
import MyCourse from "./components/MyCourse";
import MyEnrollments from "./pages/MyEnrollments";
import Video from "./components/Video";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import UploadLecture from "./components/UploadLecture";
import EditCourse from "./components/EditCourse";
import DashBoard from "./components/DashBoard";
import Lectures from "./components/Lectures";
import EditLecture from "./components/EditLecture";
import CourseProgress from "./pages/CourseProgress";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllUser from "./pages/Admin/AllUser";
import AdminLayout from "./pages/Admin/AdminLayout";

const App = () => {
  const { role } = AuthStore();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ role === "teacher" ? ( <Layout /> ) : role === "admin" ? ( <AdminLayout /> ) : ( <Home /> )}>
            {role === "teacher" && (
              <>
                <Route path="addCourse" element={<AddCourse />} />
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="myUploads" element={<MyCourse />} />
                <Route path="uploadLecture" element={<UploadLecture />} />
                <Route path="editCourse/:id" element={<EditCourse />} m />
                <Route
                  path="editCourse/:id/addLecture"
                  element={<Lectures />}
                />
                <Route
                  path="editCourse/:courseId/addLecture/:lectureId"
                  element={<EditLecture />}
                />
              </>
            )}
            {role === "admin" && (
              <>
                <Route path="admin_dashboard" element={<AdminDashboard />} />
                <Route path="getuser" element={<AllUser />} />
              </>
            )}
          </Route>
          <Route path="/courses" element={<CourseList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/not_found" element={<NotFound />} />
          <Route path="/my_enrollment" element={<MyEnrollments />} />
          <Route path="/preview/:id" element={<Video />} />
          <Route path="/course_progress/:id" element={<CourseProgress />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
