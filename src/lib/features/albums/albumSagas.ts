import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { Album } from "./albumTypes";
import {
  addAlbum,
  addAlbumFailure,
  addAlbumSuccess,
  deleteAlbum,
  deleteAlbumFailure,
  deleteAlbumSuccess,
  fetchAlbum,
  fetchAlbumFailure,
  fetchAlbumSuccess,
  fetchOneAlbum,
  fetchOneAlbumFailure,
  fetchOneAlbumSuccess,
  updateAlbum,
  updateAlbumFailure,
  updateAlbumSuccess,
} from "./albumSlice";

const root_url = "https://jsonplaceholder.typicode.com/albums";

const fetchAlbumApi = async (): Promise<Album[]> => {
  const response = await axios.get(`${root_url}`);
  return response.data;
};

const fetchOneAlbumApi = async (id?: number): Promise<Album> => {
  const response = await axios.get(`${root_url}/${id}`);
  return response.data;
};

const addAlbumApi = async (title?: Partial<Album>): Promise<Album> => {
  const response = await axios.post(
    `${root_url}`,
    { title },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.data;
};

const updateAlbumApi = async (payload?: {
  id: number;
  album: Partial<Album>;
}): Promise<Album> => {
  const response = await axios.put(`${root_url}/${payload?.id}`, {
    title: payload?.album,
  });
  return response.data;
};

const deleteAlbumApi = async (id?: number): Promise<number> => {
  const response = await axios.delete(`${root_url}/${id}`);
  return response.status;
};

function* fetchAlbumSaga(): Generator {
  try {
    const data = yield call(fetchAlbumApi);
    yield put(fetchAlbumSuccess(data as Album[]));
  } catch (error) {
    yield put(fetchAlbumFailure("Failed to fetch Album"));
  }
}

function* fetchOneAlbumSaga(action: any): Generator {
  try {
    const data = yield call(fetchOneAlbumApi, action.payload);
    yield put(fetchOneAlbumSuccess(data as Album));
  } catch (error) {
    yield put(fetchOneAlbumFailure(`Failed to fetch album with specified id`));
  }
}

function* addAlbumSaga(action: any): Generator {
  try {
    const album: Partial<Album> = action.album;
    const data = yield call(addAlbumApi, album);
    yield put(addAlbumSuccess(data as Album));
  } catch (error) {
    yield put(addAlbumFailure("Failed to add Album"));
  }
}

function* updateAlbumSaga(action: any): Generator {
  try {
    const { id, album } = action.payload;
    const data = yield call(updateAlbumApi, { id, album });
    yield put(updateAlbumSuccess(data as Album));
  } catch (error) {
    yield put(updateAlbumFailure("Failed to update Album"));
  }
}

function* deleteAlbumSaga(action: any): Generator {
  try {
    yield call(deleteAlbumApi, parseInt(action.payload));
    yield put(deleteAlbumSuccess(parseInt(action.payload)));
  } catch (error) {
    yield put(deleteAlbumFailure("Failed to delete Album"));
  }
}

function* albumSaga(): Generator {
  yield takeEvery(fetchAlbum.type, fetchAlbumSaga);
  yield takeEvery(fetchOneAlbum.type, fetchOneAlbumSaga);
  yield takeEvery(addAlbum.type, addAlbumSaga);
  yield takeEvery(updateAlbum.type, updateAlbumSaga);
  yield takeEvery(deleteAlbum.type, deleteAlbumSaga);
}

export default albumSaga;
