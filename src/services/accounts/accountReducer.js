import { createSlice } from "@reduxjs/toolkit"
import { accountLoginThunk, accountLogoutThunk, accountRegisterThunk } from "./accountThunks";

const initialState = {
  loggedIn: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  extraReducers: {
    [accountLoginThunk.fulfilled]:
      (state) => {
        state.loggedIn = true;
      },
    [accountLoginThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        // do something when login fails
      },
    [accountLogoutThunk.fulfilled]:
      (state) => {
        state.loggedIn = false;
      },
    [accountRegisterThunk.fulfilled]:
      (state) => {
        state.loggedIn = true;
      },
    [accountRegisterThunk.rejected]:
      (state) => {
        state.loggedIn = false;
      },
  }
})

export default accountSlice.reducer;