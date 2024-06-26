export interface IComment {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
}

export interface FetchTracksActionPayload {
  tracks: ITrack[];
  totalCount: number;
}

export interface FetchQueryTracks {
  
}

export interface TrackState {
  tracks: ITrack[];
  error: string;
  totalCount: number;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  FIRST_FETCH_TRACKS = "FIRST_FETCH_TRACKS",
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: FetchTracksActionPayload;
}

interface FetchFirstTracksAction {
  type: TrackActionTypes.FIRST_FETCH_TRACKS;
  payload: FetchTracksActionPayload;
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction =
  | FetchTracksAction
  | FetchTracksErrorAction
  | FetchFirstTracksAction;
