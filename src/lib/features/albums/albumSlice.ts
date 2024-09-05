import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "./albumTypes";

interface AlbumState {
  albumsList: Album[];
  selectedAlbum?: Album;
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albumsList: [],
  selectedAlbum: undefined,
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    sendingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumSuccess(state, action: PayloadAction<Album[]>) {
      state.albumsList = action.payload;
      state.loading = false;
    },
    fetchAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchOneAlbumSuccess(state, action: PayloadAction<Album>) {
      state.selectedAlbum = action.payload;
      state.loading = false;
    },
    fetchOneAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addAlbumSuccess(state, action: PayloadAction<Album>) {
      state.albumsList.push(action.payload);
      state.loading = false;
    },
    addAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateAlbumSuccess(state, action: PayloadAction<Album>) {
      const index = state.albumsList.findIndex(
        (album: Album) => album.id === action.payload.id
      );
      if (index !== -1) {
        state.albumsList[index] = action.payload;
      }
      state.loading = false;
    },
    updateAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteAlbumSuccess(state, action) {
      state.albumsList = state.albumsList.filter(
        (album: Album) => album.id !== action.payload
      );
      state.loading = false;
    },
    deleteAlbumFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchAlbum: (state: any) => {},
    fetchOneAlbum: (state:any, action:PayloadAction<string>)=>{},
    addAlbum: (state: any, action: PayloadAction<Album>) => {},
    updateAlbum: (
      state: any,
      action: PayloadAction<{ id: number; album: Album }>
    ) => {},
    deleteAlbum: (state: any, action: PayloadAction<string>) => {},
  },
});

export const {
  sendingRequest,
  fetchAlbumSuccess,
  fetchAlbumFailure,
  fetchOneAlbumSuccess,
  fetchOneAlbumFailure,
  addAlbumSuccess,
  addAlbumFailure,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumSuccess,
  deleteAlbumFailure,
  fetchAlbum,
  fetchOneAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = albumSlice.actions;

export default albumSlice.reducer;
