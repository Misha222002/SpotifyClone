import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { wrapper } from "@/store";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface TrackPageProps {
  serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");
  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={"Музыкальная площадка - " + track.name + " - " + track.artist}
      keywords={"Музыка, артисты, " + track.name + ", " + track.artist}
    >
      <Button
        variant="outlined"
        style={{ fontSize: 32 }}
        onClick={() => router.push("/tracks")}
      >
        К списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова к треку</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField {...text} label="Комментарий" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const response = await axios.get(
        "http://localhost:5000/tracks/" + params?.id
      );
      return { props: { serverTrack: response.data } };
    }
);
