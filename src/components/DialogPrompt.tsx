import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogPromptProps {
  title: string;
  explanation: string;
  open: boolean;
  handleClose: () => void;
  handleAccept: (params: any) => void;
}

export default function DialogPrompt(props: DialogPromptProps) {
  const { title, explanation, open, handleClose, handleAccept } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {explanation}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAccept} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
