import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "authData",
  storage,
};

const userSlice = createSlice({
  name: "authData",
  initialState: {
    user: null,
    authToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addPostCount: (state, action) => {
      state.user.postsCount += 1;
    },
    updateUserStatus: (state, action) => {
      debugger;
      state.user.activityStatus = action.payload;
    },
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.authToken = null;
    },
  },
});

export const { setUser, setToken, logout, addPostCount, updateUserStatus } =
  userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
