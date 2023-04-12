import { createAsyncThunk } from "@reduxjs/toolkit";
import * as accountService from "./accountService";

export const accountLoginThunk = createAsyncThunk(
  'account/login',
  async (credentials) => {
    return await accountService.login(credentials);
  }
);

export const accountLogoutThunk = createAsyncThunk(
  'account/logout',
  async () => {
    return await accountService.logout();
  }
);

