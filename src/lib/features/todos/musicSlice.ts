import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "./types";

interface MusicState {
  musicList: Music[];
  loading: boolean;
  error: string | null;
}

const initialState: MusicState = {
  musicList: [],
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    sendingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMusicSuccess(state, action: PayloadAction<Music[]>) {
      state.musicList = action.payload;
      state.loading = false;
    },
    fetchMusicFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addMusicSuccess(state, action: PayloadAction<Music>) {
      state.musicList.push(action.payload);
      state.loading = false;
    },
    addMusicFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateMusicSuccess(state, action: PayloadAction<Music>) {
      const index = state.musicList.findIndex(
        (music: Music) => music.id === action.payload.id
      );
      if (index !== -1) {
        state.musicList[index] = action.payload;
      }
      state.loading = false;
    },
    updateMusicFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteMusicSuccess(state, action: PayloadAction<string>) {
      state.musicList = state.musicList.filter(
        (music: Music) => music.id !== action.payload
      );
      state.loading = false;
    },
    deleteMusicFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchMusic: (state: any) => {},
    addMusic: (state: any, action: PayloadAction<FormData>) => {},
    updateMusic: (
      state: any,
      action: PayloadAction<{ id: string; music: Music }>
    ) => {},
    deleteMusic: (state: any, action: PayloadAction<string>) => {},
  },
});

export const {
  sendingRequest,
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
} = musicSlice.actions;

export default musicSlice.reducer;
