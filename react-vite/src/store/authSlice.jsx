import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // Lưu danh sách tài khoản đã đăng ký
  currentUser: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.users.push(action.payload); // Lưu thông tin tài khoản mới
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
      if (user) {
        state.currentUser = user;
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
