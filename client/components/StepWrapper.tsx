import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface StepWrapperProps {
  activeStep: number;
  children: React.ReactNode;
  width: number;
  name: keyof typeof steps;
}
const steps = {
  track: ["Информация о треке", "Загрузить обложку", "Загрузить сам трек"],
  albums: [
    "Информация о альбоме",
    "Загрузить обложку альбома",
    "Выбрать треки",
  ],
};
const StepWrapper: React.FC<StepWrapperProps> = ({
  activeStep,
  children,
  width,
  name,
}) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps[name].map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 270 }}
      >
        <Card style={{ minWidth: width }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
