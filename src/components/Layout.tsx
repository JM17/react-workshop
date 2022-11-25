import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

export function Layout(props: { onClick: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f5f5f5",
        width: "100%",
        height: "100vh",
      }}
    >
      <SideMenu />
      <main>
        <Outlet />
        {/*<Card>*/}
        {/*  <CardContent>*/}
        {/*    <Typography color={"primary"}>React workshop</Typography>*/}
        {/*  </CardContent>*/}
        {/*  <CardActions>*/}
        {/*    <Button onClick={props.onClick}>Switch mode</Button>*/}
        {/*  </CardActions>*/}
        {/*</Card>*/}
      </main>
    </div>
  );
}
