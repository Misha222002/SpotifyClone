import AlbumList from "@/components/Album/AlbumList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchAlbums } from "@/store/actions-creators/album";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  const { albums, error } = useTypedSelector((state) => state.album);

  if (error) {
    return <div>Ппоизошла ошибка</div>;
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: "900px" }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список альбомов</h1>
              <Button
                onClick={() => {
                  router.push("/albums/create");
                }}
              >
                Создать альбом
              </Button>
            </Grid>
          </Box>
          <AlbumList albums={albums}></AlbumList>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(await fetchAlbums());
      return { props: {} };
    }
);
