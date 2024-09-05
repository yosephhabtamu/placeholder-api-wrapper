import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import albumReducer from "./features/albums/albumSlice";
import userReducer from "./features/users/userSlice";
import albumSaga from "./features/albums/albumSagas";
import userSaga from "./features/users/userSagas";
import photoReducer from "./features/photos/photoSlice";
import photoSaga from "./features/photos/photoSagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    album: albumReducer,
    user: userReducer,
    photo: photoReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(albumSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(photoSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


