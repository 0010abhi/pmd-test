import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CreateArticleFormMetadata = [
  {
    name: "Title",
    type: "text",
    dataKey: "title",
  },
  {
    name: "URL",
    type: "text",
    dataKey: "url",
  },
  {
    name: "Description",
    type: "text",
    dataKey: "text",
  },
  {
    name: "Image",
    type: "file",
    dataKey: "img",
  },
];

export default function CreateArticle(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [newData, setNewData] = useState<any>({
    title: "",
    url: "",
    desc: "",
    img: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleTextChange(value: string, key: string) {
    setNewData({
      ...newData,
      [key]: value,
    });
  }

  function appendData() {
    // TODO: validate data here before submit.
    props.appendData(newData);
  }

  return (
    <div>
      <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Article</DialogTitle>
        <DialogContent>
          {CreateArticleFormMetadata.map((metdata, index) => (
            <TextField
              key={index}
              // autoFocus
              margin="dense"
              id={metdata.name}
              label={metdata.name}
              type={metdata.type}
              fullWidth
              value={newData[metdata.dataKey]}
              onChange={(e) => {
                handleTextChange(e.target.value, metdata.dataKey);
              }}
              // variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={appendData}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}