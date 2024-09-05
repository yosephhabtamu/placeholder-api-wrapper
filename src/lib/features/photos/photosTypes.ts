import { fetchPhoto, addPhoto, updatePhoto, deletePhoto } from "./photoSlice";


export interface FetchPhotoAction {
  type: typeof fetchPhoto.type;
  payload: number;
}

export interface AddMusicAction {
  type: typeof addPhoto.type;
  payload: Photo;
}

export interface UpdatePhotoAction {
  type: typeof updatePhoto.type;
  payload: {
    id: string;
    photo: Photo;
  };
}

export interface DeletePhotoAction {
  type: typeof deletePhoto.type;
  payload: string; 
}

export interface Photo {
  id: number;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}
