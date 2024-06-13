import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Container } from "@mui/material";
import Head from "next/head";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  title?: string;
  children: ReactNode;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <div>
      <Head>
        <title>{title || "Музыкальная площадка"}</title>
        <meta
          name="description"
          content={
            "Музыкальная площадка, здесь каждый может оставить свой трек и стать знаменитым" +
            description
          }
        />
        <meta name="robots" content="index follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{ margin: "45px auto"}} >{children}</Container>
      <Player />
    </div>
  );
};

export default MainLayout;
