import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function CreateArticle(props: { url: string }) {
  return (
    <div>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
