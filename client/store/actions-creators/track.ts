import { TrackAction, TrackActionTypes } from "@/types/track";
import axios from "axios";
import { Dispatch } from "redux";

export const fetchTracks = (count: number, offset: number) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks", {
        params: {
          count,
          offset,
        },
      });
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const firstFetchTracks = (count = 5, offset = 0) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks", {
        params: {
          count,
          offset,
        },
      });
      dispatch({
        type: TrackActionTypes.FIRST_FETCH_TRACKS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const deleteTrack = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      await axios.delete("http://localhost:5000/tracks/" + id);
      // dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};



export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracks/search?query=" + query
      );
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};
