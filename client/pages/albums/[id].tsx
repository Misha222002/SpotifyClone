import TrackList from "@/components/TrackList";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { IAlbum } from "@/types/album";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface AlbumPageProps {
  serverAlbum: IAlbum;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ serverAlbum }) => {
  const [album, setAlbum] = useState(serverAlbum);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");
  //   const addComment = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/tracks/comment",
  //         {
  //           username: username.value,
  //           text: text.value,
  //           trackId: track._id,
  //         }
  //       );
  //       setTrack({ ...track, comments: [...track.comments, response.data] });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return (
    <MainLayout>
      <Button
        variant="outlined"
        style={{ fontSize: 32 }}
        onClick={() => router.push("/albums")}
      >
        К списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + album.picture}
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h1>Название альбома - {album.name}</h1>
          <h1>Исполнитель - {album.author}</h1>
        </div>
      </Grid>
      <h1>Треки</h1>
      {/* <Grid container>
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField {...text} label="Комментарий" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid> */}
      <TrackList tracks={album.tracks} albumId={album._id} />
    </MainLayout>
  );
};

export default AlbumPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const response = await axios.get(
        "http://localhost:5000/albums/" + params?.id
      );
      return { props: { serverAlbum: response.data } };
    }
);
