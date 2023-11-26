import { createSlice } from "@reduxjs/toolkit";
const userInfoName = "userInfo";

let userInfoFromStorage = localStorage.getItem(userInfoName);
try {
  userInfoFromStorage =
    userInfoFromStorage && JSON.parse(userInfoFromStorage)
      ? JSON.parse(userInfoFromStorage)
      : null;
} catch (err) {
  userInfoFromStorage = null;
}

const initialState = {
  userInfo: userInfoFromStorage,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserInfo: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem(userInfoName, JSON.stringify(payload));
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem(userInfoName);
    },
  },
});

export const { addUserInfo, removeUserInfo } = auth.actions;

export default auth.reducer;
