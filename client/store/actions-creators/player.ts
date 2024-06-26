import { PlayerAction, PlayerActionTypes } from "@/types/player";
import { ITrack } from "@/types/track";

export const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE };
};
export const setActiveTrack = (payload: ITrack | null): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload };
};
export const setCurrentTimeTrack = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};
export const setDurationTrack = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};
export const setVolumeTrack = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};
