import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthStore } from "./store/AuthStore";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Logout from "./components/Logout";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./components/Teacher/AddCourse";
import MyCourse from "./components/Teacher/MyCourse";
import MyEnrollments from "./pages/MyEnrollments";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import Layout from "./components/Teacher/Layout";
import UploadLecture from "./components/Teacher/UploadLecture";
import EditCourse from "./components/Teacher/EditCourse";
import DashBoard from "./components/Teacher/DashBoard";
import Lectures from "./components/Teacher/Lectures";
import EditLecture from "./components/Teacher/EditLecture";
import CourseProgress from "./pages/CourseProgress";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllUser from "./pages/Admin/AllUser";
import AdminLayout from "./pages/Admin/AdminLayout";
import PlacementGuide from "./pages/PlacementGuide";
import NotFoundPage from "./components/ErrorPage";
import AllContact from "./pages/Admin/AllContact";
import Achievement from "./components/Achievement";

const App = () => {
  const { role } = AuthStore();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              role === "teacher" ? (
                <Layout />
              ) : role === "admin" ? (
                <AdminLayout />
              ) : (
                <Home />
              )
            }
          >
            {role === "teacher" && (
              <>
                <Route path="addCourse" element={<AddCourse />} />
                <Route path="" element={<DashBoard />} />
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
                <Route path="" element={<AdminDashboard />} />
                <Route path="getuser" element={<AllUser />} />
                <Route path="getcontact" element={<AllContact />} />
              </>
            )}
          </Route>
          <Route path="/placement" element={<PlacementGuide />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/card" element={<Achievement />} />
          <Route path="/my_enrollment" element={<MyEnrollments />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/course_progress/:id" element={<CourseProgress />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
