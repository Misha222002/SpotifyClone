import { ITrack } from "@/types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useAction";
import { deleteTrack } from "@/store/actions-creators/track";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { removeTrackAction } from "@/store/actions-creators/album";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
  albumId?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, albumId = "" }) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { setActiveTrack, playTrack, pauseTrack } = useActions();
  const { active, currentTime, duration, pause, volume } = useTypedSelector(
    (state) => state.player
  );

  const play = (e: any) => {
    e.stopPropagation();
    if (active?._id != track._id) {
      setActiveTrack(track);
    }
    if (pause) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  const removeTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("remove Track");
    await dispatch(await deleteTrack(track._id));
    router.reload();
  };

  const removeTrackFromAlbum = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    console.log("remove Track fron album");
    await dispatch(await removeTrackAction(track._id, albumId));
    router.reload();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active?._id == track._id && !pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        width={70}
        height={60}
        src={"http://localhost:5000/" + track.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: "200px", margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      <div style={{ marginRight: "auto" }}>Прослушиваний - {track.listens}</div>
      {active && <div>02:42 / 03:22</div>}
      {!albumId && (
        <IconButton
          onClick={(e) => removeTrack(e)}
          style={{ marginLeft: "auto" }}
        >
          <Delete />
        </IconButton>
      )}
      {albumId && (
        <IconButton
          onClick={(e) => removeTrackFromAlbum(e)}
          style={{ marginLeft: "auto" }}
        >
          <HighlightOffIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default TrackItem;
