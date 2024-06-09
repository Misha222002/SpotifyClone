import { Button } from "@mui/material";
import React from "react";

export default function index() {
  return (
    <>
      <div className="center">
        <h1>Добро пожаловать</h1>
        <h3>Добро пожаловать</h3>
      </div>

      <style>
        {`
          .center {
            margin-top:150px;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
