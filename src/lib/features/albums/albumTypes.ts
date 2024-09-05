import { addAlbum, deleteAlbum, fetchAlbum, fetchOneAlbum, updateAlbum } from "./albumSlice";

export interface FetchAlbumsAction {
  type: typeof fetchAlbum.type;
}

export interface FetchOneAlbumAction {
  type: typeof fetchOneAlbum.type;
}

export interface AddAlbumsAction {
  type: typeof addAlbum.type;
  payload: Album;
}

export interface UpdateAlbumAction {
  type: typeof updateAlbum.type;
  payload: {
    id: number;
    music: Album;
  };
}

export interface DeleteAlbumAction {
  type: typeof deleteAlbum.type;
  payload: number;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}
