import { createSlice } from "@reduxjs/toolkit"
import { accountLoginThunk, accountLogoutThunk, accountRegisterThunk, accountUpdateThunk } from "./accountThunks";

const initialState = {
  loggedIn: false,
  profile: null,
  attemptedLogin: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  extraReducers: {
    [accountLoginThunk.fulfilled]:
      (state, { payload }) => {
        if (payload?.profile) {
          state.loggedIn = true;
          console.log(payload);
          state.profile = payload?.profile;
          state.attemptedLogin= true;
        }
      },
    [accountLoginThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
        state.attemptedLogin = true;
        // do something when login fails
      },
    [accountLogoutThunk.fulfilled]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
        state.attemptedLogin = false;
      },
    [accountRegisterThunk.fulfilled]:
      (state, { payload }) => {
        state.loggedIn = true;
        state.profile = payload.profile;
        state.attemptedLogin = true;
      },
    [accountRegisterThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        state.profile = null;
        state.attemptedLogin = true;
      },
    [accountUpdateThunk.fulfilled]:
      (state, { payload }) => {
        state.profile = payload;
      }
  }
})

export default accountSlice.reducer;