import { Route, Routes, useParams } from "react-router-dom";
import { EnhancedTable, HeadCell } from "../../components/DataTable";
import { ViewContainer } from "../../components/Views/ViewContainer";
import * as React from "react";
import { FC, ReactNode } from "react";
import Form from "../../components/Views/Form";
import { deleteMethod, getMethod } from "../../context/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DialogPrompt from "../../components/DialogPrompt";
import { MyContainer } from "../../components/Views/MyContainer";
import { TitleRow } from "../../components/Views/TitleRow";
import { useCreate, useUpdate } from "../../hooks/useAsync";
import { useAuth } from "../../context/auth";
import { Role } from "../../Roles";

export const Users = {
  path: "users/*",
  element: () => (
    <Routes>
      <Route path={"*"} element={<ListView />} />
      <Route
        path={"create"}
        element={
          <CreateView title={"Add user"} CustomContainer={MyContainer} />
        }
      />
      <Route
        path={":id"}
        element={<EditView title={"User"} CustomContainer={MyContainer} />}
      />
    </Routes>
  ),
};

/** Remote data type */
export type UserData = {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
};

const headers: HeadCell<UserData>[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "email",
    label: "E-mail",
  },
  {
    id: "firstname",
    label: "Name",
  },
  {
    id: "lastname",
    label: "Last Name",
  },
];

const ListView = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selected, setSelected] = React.useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    handleClickOpen();
    setSelected(id);
  };

  const { data, isLoading } = useQuery<UserData[]>(["users"], () =>
    getMethod("/users")
  );

  const queryClient = useQueryClient();

  const remove = useMutation((id: string) => deleteMethod(`/users/${id}`), {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => console.log("error"),
    onSettled: () => queryClient.invalidateQueries(["users"]),
  });

  const { isAuthorized } = useAuth();

  return (
    <>
      <ViewContainer>
        <EnhancedTable
          data={data || []}
          headers={headers}
          title={"Users"}
          isLoading={isLoading}
          handleDelete={handleDelete}
          readonly={!isAuthorized(Role.USERS_WRITE)}
        />
      </ViewContainer>
      <DialogPrompt
        open={openDialog}
        title={"Are you sure?"}
        explanation={"This will remove entry from database"}
        handleClose={handleClose}
        handleAccept={() => {
          remove.mutate(selected);
          setOpenDialog(false);
        }}
      />
    </>
  );
};

interface OneViewProps {
  title: string;
  /** Turns off submit */
  readonly?: boolean;
  CustomContainer?: FC<{ children: ReactNode }>;
}

const CreateView = (props: OneViewProps) => {
  const { title, CustomContainer = ViewContainer } = props;

  const create = useCreate({
    resourceName: "users",
    queryKeyForInvalidation: "users",
  });

  return (
    <CustomContainer>
      <TitleRow title={title} />
      <Form onSubmit={(values) => create.mutate(values)} />
    </CustomContainer>
  );
};

const EditView = (props: OneViewProps) => {
  const params = useParams();
  const { isAuthorized } = useAuth();

  const { title, CustomContainer = ViewContainer } = props;

  const { data } = useQuery(["users", params.id], () =>
    getMethod(`/users/${params.id}`)
  );

  const update = useUpdate({
    resourceName: "users",
    id: `${params.id}`,
    queryKeyForInvalidation: "users",
  });

  return (
    <CustomContainer>
      <TitleRow title={title} />
      <Form
        onSubmit={(values) => update.mutate(values)}
        readonly={!isAuthorized(Role.USERS_WRITE)}
        data={data}
      />
    </CustomContainer>
  );
};
