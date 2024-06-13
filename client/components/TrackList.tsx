import { ITrack } from "@/types/track";
import { Box, Grid } from "@mui/material";
import React from "react";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
  albumId?: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, albumId }) => {
  if(!tracks) return 
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} albumId={albumId}/>
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
