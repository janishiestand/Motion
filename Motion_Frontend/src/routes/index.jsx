import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../routes/Authentication/LoginPage.jsx";
import RegisterPage from "../routes/Authentication/RegisterPage.jsx";
import ValidationPage from "../routes/Authentication/Validation.jsx";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import UserProfile from "./ProtectedPages/UserProfile.jsx";
import Posts from "./ProtectedPages/Posts.jsx";
import Feed from "./ProtectedPages/Feed.jsx";
import FindFriends from "./ProtectedPages/FindFriends.jsx";
import ProfilePage from "./ProtectedPages/ProfilePage.jsx";
import EditUserProfile from "./ProtectedPages/EditUserProfile.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register">
          <Route index element={<RegisterPage />} />
          <Route path="validation" element={<ValidationPage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserProfile />} />
            <Route path="/editprofile" element={<EditUserProfile />} />
            <Route path="/posts" element={<Posts />} >
                <Route path=':filterID' element={<Feed/>} />
            </Route>
            <Route path="/users/:userId" element={<ProfilePage />} />
            <Route path="/findfriends" element={<FindFriends />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
