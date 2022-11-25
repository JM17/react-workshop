import * as React from "react";
import {PropsWithChildren} from "react";
import {Card, CardContent} from "@mui/material";

export function MyContainer({children}: PropsWithChildren) {
  return (
    <div style={{padding: "16px"}}>
      <Card elevation={0} variant={"outlined"} sx={{width: "600px"}}>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
