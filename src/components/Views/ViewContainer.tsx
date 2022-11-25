import {FC, PropsWithChildren} from "react";

export const ViewContainer: FC<PropsWithChildren> = ({children}) => {
  return <div style={{padding: "16px"}}>{children}</div>;
};
