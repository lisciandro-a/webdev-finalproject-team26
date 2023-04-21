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

export const accountRegisterThunk = createAsyncThunk(
  'account/register',
  async (newAccountInfo) => {
    return await accountService.register(newAccountInfo);
  }
)

export const accountUpdateThunk = createAsyncThunk(
  'account/update',
  async (updatedAccountInfo) => {
    return await accountService.updateProfile(updatedAccountInfo, updatedAccountInfo.oldUsername);
  }
)

