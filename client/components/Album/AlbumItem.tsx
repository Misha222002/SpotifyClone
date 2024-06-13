import { ITrack } from "@/types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { IAlbum } from "@/types/album";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";
import { deleteAlbum } from "@/store/actions-creators/album";

interface AlbumItemProps {
  album: IAlbum;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const removeAlbum = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await dispatch(await deleteAlbum(album._id));
    router.reload();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/albums/" + album._id)}
    >
      <img
        width={70}
        height={60}
        src={"http://localhost:5000/" + album.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: "200px", margin: "0 20px" }}
      >
        <div>{album.name}</div>
      </Grid>
      <IconButton
        onClick={(e) => removeAlbum(e)}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default AlbumItem;
