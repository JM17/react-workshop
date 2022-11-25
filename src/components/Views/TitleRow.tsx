import {makeStyles} from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {ArrowBackIos} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import * as React from "react";

export const useStyles = makeStyles(() =>
  createStyles({
    titleRow: {
      display: "flex",
      alignItems: "center",
    },
    submitButton: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);
export const TitleRow = ({title}: { title: string }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.titleRow}>
      <span style={{display: "flex"}}>
        <IconButton
          size={"small"}
          onClick={() => navigate("..", {replace: true})}
        >
          <ArrowBackIos/>
        </IconButton>
      </span>
      <Typography variant={"h6"}>{title}</Typography>
    </div>
  );
};
