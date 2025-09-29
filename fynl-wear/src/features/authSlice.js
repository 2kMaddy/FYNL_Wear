import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewUser,
  logInUser,
  authoriseUser,
} from "../services/userServices";

// Create user
export const fetchCreateUser = createAsyncThunk(
  "user/createUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await createNewUser(name, email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create user failed"
      );
    }
  }
);

// Login user
export const fetchLoginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await logInUser(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login user failed"
      );
    }
  }
);

// authorise user
export const fetchAuthoriseUser = createAsyncThunk(
  "user/authoriseUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authoriseUser();
      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(
        error.response?.data?.message || "Authorise user failed"
      );
    }
  }
);

const initialState = {
  user: {},
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.loading = true;
      state.error = null;
      state.user = {};
      state.isAuthenticated = false;
    };
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isAuthenticated = false;
    };
    builder
      // Create user
      .addCase(fetchCreateUser.pending, commonPending)
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(fetchCreateUser.rejected, commonReject)

      //   Login user
      .addCase(fetchLoginUser.pending, commonPending)
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(fetchLoginUser.rejected, commonReject)

      // Authorise user
      .addCase(fetchAuthoriseUser.pending, commonPending)
      .addCase(fetchAuthoriseUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(fetchAuthoriseUser.rejected, commonReject);
  },
});

export default authSlice.reducer;
