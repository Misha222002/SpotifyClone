import Navbar from "@/components/Navbar";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@mui/material";
import React from "react";

export default function index() {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Добро пожаловать</h1>
          <h3>Добро пожаловать</h3>
        </div>
      </MainLayout>
      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
