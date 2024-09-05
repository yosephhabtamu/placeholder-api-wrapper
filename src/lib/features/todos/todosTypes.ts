import { addMusic, deleteMusic, fetchMusic, updateMusic } from "./musicSlice";

export interface FetchMusicAction {
  type: typeof fetchMusic.type;
}

export interface AddMusicAction {
  type: typeof addMusic.type;
  payload: Music;
}

export interface UpdateMusicAction {
  type: typeof updateMusic.type;
  payload: {
    id: string;
    music: Music;
  };
}

export interface DeleteMusicAction {
  type: typeof deleteMusic.type;
  payload: string; // id of the music to be deleted
}

export interface Music {
  id?: string;
  title: string;
  album: string;
  artist: string;
  genre: string;
}
