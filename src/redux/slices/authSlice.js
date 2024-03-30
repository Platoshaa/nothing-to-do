import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api";
const initialState = {
  email: null,
  token: null,
};
export const signIn = createAsyncThunk(
  "setUserStatus",
  async (thunkAPI) => {
    const response = await authAPI.signIn();
    localStorage.setItem("token", JSON.stringify(response.uid));
    return { email: response.email, token: response.uid };
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
    },
    removeUser(state) {
      localStorage.removeItem("token");
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signIn.fulfilled, (state, action) => {
      //   // Add user to the state array
      state = action.payload;
    });
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

export const asyncSignOut = () => {
  return (dispatch) => {
    authAPI.signOut().then(() => {
      dispatch(removeUser());
    });
  };
};
export const asyncSignIn = () => {
  return (dispatch) => {
    authAPI.signIn().then((response) => {
      if (response) {
        const state = { email: response.email, token: response.uid };
        dispatch(setUser(state));
      }
    });
  };
};
