import { ITrack } from "@/types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useAction";
import { deleteTrack } from "@/store/actions-creators/track";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = true }) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { setActiveTrack, playTrack, pauseTrack } = useActions();
  const play = (e: any) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  const removeTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await dispatch(await deleteTrack(track._id));
    router.reload();
  };
  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <PlayArrow /> : <Pause />}
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
      <div style={{marginRight: 'auto'}}>
        Прослушиваний - {track.listens}
      </div>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        onClick={(e) => removeTrack(e)}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
