import { createSlice } from "@reduxjs/toolkit"
import { accountLoginThunk, accountLogoutThunk } from "./accountThunks";
import Cookies from 'js-cookie';

const initialState = {
  loggedIn: Cookies.get('accountToken') ? true : false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  extraReducers: {
    [accountLoginThunk.fulfilled]:
      (state, { payload }) => {
        state.loggedIn = true;
        Cookies.set('accountToken', payload.accountToken);
      },
    [accountLoginThunk.rejected]:
      (state) => {
        state.loggedIn = false;
        Cookies.remove('accountToken');
      },
    [accountLogoutThunk.fulfilled]:
      (state) => {
        state.loggedIn = false;
        Cookies.remove('accountToken');
      },
  }
})

export default accountSlice.reducer;