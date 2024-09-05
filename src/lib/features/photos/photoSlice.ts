import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "./photosTypes";

interface PhotoState {
  photoList: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  photoList: [],
  loading: false,
  error: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    sendingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPhotoSuccess(state, action: PayloadAction<Photo[]>) {
      state.photoList = action.payload;
      state.loading = false;
    },
    fetchPhotoFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addPhotoSuccess(state, action: PayloadAction<Photo>) {
      state.photoList.push(action.payload);
      state.loading = false;
    },
    addPhotoFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updatePhotoSuccess(state, action: PayloadAction<Photo>) {
      const index = state.photoList.findIndex(
        (photo: Photo) => photo.id === action.payload.id
      );
      if (index !== -1) {
        state.photoList[index] = action.payload;
      }
      state.loading = false;
    },
    updatePhotoFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deletePhotoSuccess(state, action: PayloadAction<number>) {
      state.photoList = state.photoList.filter(
        (photo: Photo) => photo.id !== action.payload
      );
      state.loading = false;
    },
    deletePhotoFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchPhoto: (state: any, action: PayloadAction<number>) => {},
    addPhoto: (state: any, action: PayloadAction<Partial<Photo>>) => {},
    updatePhoto: (
      state: any,
      action: PayloadAction<{ id: number; photo: Photo }>
    ) => {},
    deletePhoto: (state: any, action: PayloadAction<number>) => {},
  },
});

export const {
  sendingRequest,
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
} = photoSlice.actions;

export default photoSlice.reducer;
