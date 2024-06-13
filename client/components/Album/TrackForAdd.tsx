import { ITrack } from "@/types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../../styles/TrackItem.module.scss";

import React from "react";
import { Delete } from "@mui/icons-material";
interface TrackForAddProps {
  track: ITrack;
  isDraggble: boolean;
}

const TrackForAdd: React.FC<TrackForAddProps> = ({ track, isDraggble }) => {
  let background;
  if (isDraggble) {
    background = "lightgray";
  } else {
    background = "inherit";
  }
  return (
    <div>
      <Card className={styles.track} style={{ background: `${background}` }}>
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
        <div style={{ marginRight: "auto" }}>
          Прослушиваний - {track.listens}
        </div>
      </Card>
    </div>
  );
};

export default TrackForAdd;
