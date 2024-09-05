import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchPhotoSuccess,
  fetchPhotoFailure,
  addPhotoSuccess,
  addPhotoFailure,
  updatePhotoSuccess,
  updatePhotoFailure,
  deletePhotoSuccess,
  deletePhotoFailure,
  fetchPhoto,
  addPhoto,
  updatePhoto,
  deletePhoto,
} from "./photoSlice";
import axios from "axios";
import { Photo } from "./photosTypes";

const root_url = "https://jsonplaceholder.typicode.com/photos";

const fetchPhotoApi = async (id?: number): Promise<Photo[]> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`
  );
  return response.data;
};

const addPhotoApi = async (photo?: Partial<Photo>): Promise<Photo> => {
  const response = await axios.post(`${root_url}`, photo, {});
  return response.data;
};

const updatePhotoApi = async (payload?: {
  id: number;
  photo: Partial<Photo>;
}): Promise<Photo> => {
  const response = await axios.put(
    `${root_url}/${payload?.id}`,
    payload?.photo
  );
  return response.data;
};

const deletePhotoApi = async (id?: number): Promise<void> => {
  await axios.delete(`${root_url}/${id}`);
};

function* fetchPhotoSaga(action: ReturnType<typeof fetchPhoto>): Generator {
  try {
    const id = action.payload;
    const data = yield call(fetchPhotoApi, id);
    yield put(fetchPhotoSuccess(data as Photo[]));
  } catch (error) {
    yield put(fetchPhotoFailure("Failed to fetch Photo"));
  }
}

function* addPhotoSaga(action: ReturnType<typeof addPhoto>): Generator {
  try {
    const photo = action.payload;
    const data = yield call(addPhotoApi, photo);
    yield put(addPhotoSuccess(data as Photo));
  } catch (error) {
    yield put(addPhotoFailure("Failed to add photo"));
  }
}

function* updatePhotoSaga(action: ReturnType<typeof updatePhoto>): Generator {
  try {
    const { id, photo } = action.payload;
    const data = yield call(updatePhotoApi, { id, photo });
    yield put(updatePhotoSuccess(data as Photo));
  } catch (error) {
    yield put(updatePhotoFailure("Failed to update Photo"));
  }
}

function* deletePhotoSaga(
  action: ReturnType<typeof deletePhoto>
): Generator<any, any, any> {
  try {
    yield call(deletePhotoApi, action.payload);
    yield put(deletePhotoSuccess(action.payload));
  } catch (error) {
    yield put(deletePhotoFailure("Failed to delete photo"));
  }
}

function* photoSaga(): Generator {
  yield takeEvery(fetchPhoto.type, fetchPhotoSaga);
  yield takeEvery(addPhoto.type, addPhotoSaga);
  yield takeEvery(updatePhoto.type, updatePhotoSaga);
  yield takeEvery(deletePhoto.type, deletePhotoSaga);
}

export default photoSaga;
