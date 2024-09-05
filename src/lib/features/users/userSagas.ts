import axios from "axios";
import { call, takeEvery } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  fetchOneUser,
  fetchOneUserFailure,
  fetchOneUserSuccess,
  fetchUserFailure,
  fetchUsers,
  fetchUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from "./userSlice";
import { User } from "./usersTypes";

const root_url = "https://jsonplaceholder.typicode.com/users";

const fetchUsersApi = async (): Promise<User[]> => {
  const response = await axios.get(`${root_url}`);
  return response.data;
};

const fetchOneUserApi = async (id?: number): Promise<User> => {
  const response = await axios.get(`${root_url}/${id}`);
  return response.data;
};

const addUserApi = async (user?: Partial<User>): Promise<User> => {
  const response = await axios.post(
    `${root_url}`,
    { ...user },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.data;
};

const updateUserApi = async (payload?: {
  id: number;
  user: Partial<User>;
}): Promise<User> => {
  const response = await axios.put(`${root_url}/${payload?.id}`, {
    ...payload?.user,
  });
  return response.data;
};

const deleteUserApi = async (id?: number): Promise<number> => {
  const response = await axios.delete(`${root_url}/${id}`);
  return response.status;
};

function* fetchUsersSaga(): Generator {
  try {
    const data = yield call(fetchUsersApi);
    yield put(fetchUserSuccess(data as User[]));
  } catch (error) {
    yield put(fetchUserFailure("Failed to fetch user"));
  }
}

function* fetchOneUserSaga(action: any): Generator {
  try {
    const data = yield call(fetchOneUserApi, action.payload);
    yield put(fetchOneUserSuccess(data as User));
  } catch (error) {
    yield put(fetchOneUserFailure(`Failed to fetch user with specified id`));
  }
}

function* addUserSaga(action: any): Generator {
  try {
    const user: Partial<User> = action.user;
    const data = yield call(addUserApi, user);
    yield put(addUserSuccess(data as User));
  } catch (error) {
    yield put(addUserFailure("Failed to add User"));
  }
}

function* updateUserSaga(action: any): Generator {
  try {
    const { id, user } = action.payload;
    const data = yield call(updateUserApi, { id, user });
    yield put(updateUserSuccess(data as User));
  } catch (error) {
    yield put(updateUserFailure("Failed to update User"));
  }
}

function* deleteUserSaga(action: any): Generator {
  try {
    yield call(deleteUserApi, parseInt(action.payload));
    yield put(deleteUserSuccess(parseInt(action.payload)));
  } catch (error) {
    yield put(deleteUserFailure("Failed to delete User"));
  }
}

function* userSaga(): Generator {
  yield takeEvery(fetchUsers.type, fetchUsersSaga);
  yield takeEvery(fetchOneUser.type, fetchOneUserSaga);
  yield takeEvery(addUser.type, addUserSaga);
  yield takeEvery(updateUser.type, updateUserSaga);
  yield takeEvery(deleteUser.type, deleteUserSaga);
}

export default userSaga;
