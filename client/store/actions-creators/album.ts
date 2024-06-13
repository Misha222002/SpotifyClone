import { AlbumsAction, AlbumsActionTypes } from "@/types/album";
import axios from "axios";
import { Dispatch } from "react";

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<AlbumsAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/albums");
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка при загрузке альбомов",
      });
    }
  };
};

export const deleteAlbum = (id: string) => {
  return async (dispatch: Dispatch<AlbumsAction>) => {
    try {
      await axios.delete("http://localhost:5000/albums/" + id);
      // dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const removeTrackAction = (trackId: string, albumId: string) => {
  return async (dispatch: Dispatch<AlbumsAction>) => {
    try {
      await axios.delete(`http://localhost:5000/albums/track/` + trackId, {
        params: {
          albumId,
        },
      });
      // dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};
