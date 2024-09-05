import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./usersTypes";

interface UserState {
  userList: User[];
  selectedUser?: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userList: [],
  selectedUser: undefined,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sendingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<User[]>) {
      state.userList = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchOneUserSuccess(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
      state.loading = false;
    },
    fetchOneUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.userList.push(action.payload);
      state.loading = false;
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      const index = state.userList.findIndex(
        (user: User) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
      state.loading = false;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserSuccess(state, action: PayloadAction<number>) {
      state.userList = state.userList.filter(
        (user: User) => user.id !== action.payload
      );
      state.loading = false;
    },
    deleteUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchUsers: (state) => {},
    fetchOneUser: (state: any, action: PayloadAction<string>) => {},
    addUser: (state, action: PayloadAction<User>) => {},
    updateUser: (state, action: PayloadAction<User>) => {},
    deleteUser: (state, action: PayloadAction<string>) => {},
  },
});

export const {
  sendingRequest,
  addUserSuccess,
  addUserFailure,
  fetchUserSuccess,
  fetchUserFailure,
  fetchOneUserSuccess,
  fetchOneUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  fetchUsers,
  fetchOneUser,
  addUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
