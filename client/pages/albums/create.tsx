import AudiosUpload from "@/components/Album/AudiosUpload";
import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks } from "@/store/actions-creators/track";
import { IAlbum } from "@/types/album";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audios, setAudios] = useState<ITrack[]>([]);

  const router = useRouter();
  const name = useInput("");
  const author = useInput("");

  const next = () => {
    setActiveStep((prev) => prev + 1);
    if (activeStep === 2 && picture && audios) {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("author", author.value);
      formData.append("picture", picture);

      axios
        .post("http://localhost:5000/albums", formData)
        .then((res) => {
          const cntAudios = audios.length;
          let cntSuccess = 0;
          const album: IAlbum = res.data;
          for (let audio of audios) {
            formData.append("trackId", audio._id);
            axios
              .post("http://localhost:5000/albums/addTrack", {
                trackId: audio._id,
                albumId: album._id,
              })
              .then((res) => {
                cntSuccess++;
                if (cntSuccess === cntAudios) {
                  router.push("/albums");
                }
              })
              .catch((e) => console.log(e));
            formData.delete("trackId");
          }
        })
        .catch((e) => console.log(e));
    }
  };
  //   const response = await axios.post(
  //     "http://localhost:5000/tracks/comment",
  //     {
  //       username: username.value,
  //       text: text.value,
  //       trackId: track._id,
  //     }
  //   );
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout>
      <StepWrapper width={600} activeStep={activeStep} name="albums">
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: "10px" }}
              label={"Название альбома"}
            ></TextField>
            <TextField
              {...author}
              style={{ marginTop: "10px" }}
              label={"Имя автора"}
            ></TextField>
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить обложку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <AudiosUpload setAudios={setAudios}></AudiosUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep == 0} onClick={back}>
          Назад
        </Button>
        <Button disabled={activeStep == 3} onClick={next}>
          Далее
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
