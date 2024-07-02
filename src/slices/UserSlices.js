import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FOR CREATE USER
export const CreateUser = createAsyncThunk(
  "CreateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FOR GET USER
export const GetUser = createAsyncThunk(
  "GetUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/"
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FOR DELETE USER
export const DeleteUser = createAsyncThunk(
  "DeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FOR UPDATE USER
export const UpdateUser = createAsyncThunk(
  "UpdateUser",
  async ({ userID, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET USER BY ID
export const GetUserByID = createAsyncThunk(
  "GetUserByID",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://65c09414dc74300bce8c426a.mockapi.io/tdcEval/user/${userID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlices = createSlice({
  name: "UserSlices",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FOR CREATE USER
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FOR GET USER
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FOR DELETE USER
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.loading = false;
        state.error = null;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FOR UPDATE USER
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FOR GET USER BY ID
      .addCase(GetUserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserByID.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(GetUserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default userSlices.reducer;