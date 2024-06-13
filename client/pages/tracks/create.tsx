import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const router = useRouter();
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    setActiveStep((prev) => prev + 1);
    if (activeStep == 2 && picture && audio) {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhost:5000/tracks", formData)
        .then((resp) => router.push("/tracks"))
        .catch((e) => console.log(e));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout>
      <StepWrapper name="track" width={600} activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: "10px" }}
              label={"Название трека"}
            ></TextField>
            <TextField
              {...artist}
              style={{ marginTop: "10px" }}
              label={"Имя автора"}
            ></TextField>
            <TextField
              {...text}
              style={{ marginTop: "10px" }}
              label={"Текст к песне"}
              multiline
              rows={3}
            ></TextField>
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить обложку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
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
