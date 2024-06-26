import { TrackAction, TrackActionTypes, TrackState } from "@/types/track";

const initialState: TrackState = {
  tracks: [],
  error: "",
  totalCount: 0,
};

export const trackReducer = (
  state = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return {
        error: "",
        tracks: [...state.tracks, ...action.payload.tracks],
        totalCount: action.payload.totalCount,
      };
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.FIRST_FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload.tracks,
        totalCount: action.payload.totalCount,
      };
    default:
      return { ...state };
  }
};
