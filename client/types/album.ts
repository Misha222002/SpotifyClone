import { ITrack } from "./track";

export interface IAlbum {
  _id: string;
  name: string;
  author: string;
  picture: string;
  tracks: ITrack[];
}

export interface AlbumsState {
  albums: IAlbum[];
  error: string;
}

export enum AlbumsActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
  DELETE_TRACK = "DELETE_TRACK",
}

interface FetchAlbumsAction {
  type: AlbumsActionTypes.FETCH_ALBUMS;
  payload: IAlbum[];
}

interface FetchAlbumsErrorAction {
  type: AlbumsActionTypes.FETCH_ALBUMS_ERROR;
  payload: string;
}

interface DeleteTrackAction {
  type: AlbumsActionTypes.DELETE_TRACK;
  payload: string;
}

export type AlbumsAction =
  | FetchAlbumsAction
  | FetchAlbumsErrorAction
  | DeleteTrackAction;
