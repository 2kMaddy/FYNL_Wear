import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewUser, logInUser } from "../services/userServices";

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

const initialState = {
  user: {},
  error: null,
  loading: false,
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
    };
    const commonReject = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    };
    builder
      // Create user
      .addCase(fetchCreateUser.pending, commonPending)
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCreateUser.rejected, commonReject)

      //   Login user
      .addCase(fetchLoginUser.pending, commonPending)
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, commonReject);
  },
});

export default authSlice.reducer;
