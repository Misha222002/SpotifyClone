import TrackList from "@/components/TrackList";
import { useActions } from "@/hooks/useAction";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, searchTracks } from "@/store/actions-creators/track";
import { reducer } from "@/store/reducers";
import { ITrack } from "@/types/track";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

let count = 5;
let offset = 0;

export default function index() {
  const router = useRouter();
  const { tracks, error, totalCount } = useTypedSelector(
    (state) => state.track
  );
  const { setActiveTrack } = useActions();
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState<any | null>(null);
  const [fetching, setFetching] = useState(false);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };

  useEffect(() => {
    if (fetching) {
      fetchExtraTracks();
    }
  }, [fetching]);

  const fetchExtraTracks = async () => {
    offset += count;
    await dispatch(await fetchTracks(count, offset));
    setFetching(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      totalCount > tracks.length
    ) {
      setFetching(true);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Список треков - музыкальная платформа">
      <Grid container justifyContent="center">
        <Card style={{ width: "900px" }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button
                onClick={() => {
                  router.push("/tracks/create");
                  setActiveTrack(null);
                }}
              >
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req,query }) => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(await fetchTracks(count, 0));
      return { props: {} };
    }
);

// export default wrapper.withRedux(MyPage);
