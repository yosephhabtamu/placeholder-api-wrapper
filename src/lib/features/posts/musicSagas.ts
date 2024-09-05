import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchMusicSuccess,
  fetchMusicFailure,
  addMusicSuccess,
  addMusicFailure,
  updateMusicSuccess,
  updateMusicFailure,
  deleteMusicSuccess,
  deleteMusicFailure,
  fetchMusic,
  addMusic,
  updateMusic,
  deleteMusic,
} from "./musicSlice";
import { Music } from "./types"; // Adjust the import path as needed
import axios from "axios";

const root_url = "http://localhost:8000/api/";

const fetchMusicApi = async (): Promise<Music[]> => {
  const response = await axios.get(`${root_url}music`); // Adjust API endpoint as needed
  return response.data;
};

const addMusicApi = async (music?: FormData): Promise<Music> => {
  const response = await axios.post(`${root_url}music`, music, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateMusicApi = async (payload?: {
  id: string;
  music: Music;
}): Promise<Music> => {
  const response = await axios.put(
    `${root_url}music/${payload?.id}`,
    payload?.music
  );
  return response.data;
};

const deleteMusicApi = async (id?: string): Promise<void> => {
  await axios.delete(`${root_url}music/${id}`);
};

function* fetchMusicSaga(): Generator {
  try {
    const data = yield call(fetchMusicApi);
    yield put(fetchMusicSuccess(data as Music[]));
  } catch (error) {
    yield put(fetchMusicFailure("Failed to fetch music"));
  }
}

function* addMusicSaga(action: ReturnType<typeof addMusic>): Generator {
  try {
    const music: FormData = action.payload;
    const data = yield call(addMusicApi, music);
    yield put(addMusicSuccess(data as Music));
  } catch (error) {
    yield put(addMusicFailure("Failed to add music"));
  }
}

function* updateMusicSaga(action: ReturnType<typeof updateMusic>): Generator {
  try {
    const { id, music } = action.payload;
    const data = yield call(updateMusicApi, { id, music });
    yield put(updateMusicSuccess(data as Music));
  } catch (error) {
    yield put(updateMusicFailure("Failed to update music"));
  }
}

function* deleteMusicSaga(
  action: ReturnType<typeof deleteMusic>
): Generator<any, any, any> {
  try {
    yield call(deleteMusicApi, action.payload);
    yield put(deleteMusicSuccess(action.payload as string));
  } catch (error) {
    yield put(deleteMusicFailure("Failed to delete music"));
  }
}

function* musicSaga(): Generator {
  yield takeEvery(fetchMusic.type, fetchMusicSaga);
  yield takeEvery(addMusic.type, addMusicSaga);
  yield takeEvery(updateMusic.type, updateMusicSaga);
  yield takeEvery(deleteMusic.type, deleteMusicSaga);
}

export default musicSaga;
