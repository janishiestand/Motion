import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { 
  name: "", 
  access_token: undefined,
  id: 0,
  avatar: "",
 },
  reducers: {
    login_user: (state, action) => {
      state.name = action.payload.user.username;
      state.access_token = action.payload.access;
    },
    logout_user: (state) => {
      state.name = "";
      state.access_token = null;
      localStorage.setItem("accessToken", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("avatar", "");
    },
    loadUser: (state, action) => {
      state.details = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatar", action.payload);
    }
  },
});

export const { login_user, logout_user, loadUser, setId, setAvatar} = userSlice.actions;

export default userSlice.reducer;
