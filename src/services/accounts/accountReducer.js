import { createSlice } from "@reduxjs/toolkit"
import { accountLoginThunk, accountLogoutThunk, accountRegisterThunk, accountUpdateThunk } from "./accountThunks";

const initialState = {
  loggedIn: false,
  profile: null,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  extraReducers: {
    [accountLoginThunk.fulfilled]:
      (state, { payload }) => {
        state.loggedIn = true;
        state.profile = payload.profile;
      },
    [accountLoginThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
        // do something when login fails
      },
    [accountLogoutThunk.fulfilled]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
      },
    [accountRegisterThunk.fulfilled]:
      (state, { payload }) => {
        state.loggedIn = true;
        state.profile = payload.profile;
      },
    [accountRegisterThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
      },
    [accountUpdateThunk.fulfilled]:
      (state, { payload }) => {
        console.log(payload);
        state.profile = payload;
      }
  }
})

export default accountSlice.reducer;