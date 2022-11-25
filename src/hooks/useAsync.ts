import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMethod, putMethod } from "../context/api";
import { useNavigate } from "react-router-dom";

export const useUpdate = ({
  resourceName,
  id,
  queryKeyForInvalidation,
}: {
  resourceName: string;
  id: string | number;
  queryKeyForInvalidation: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values: any) => putMethod(`/${resourceName}/${id}`, values),
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
      onSettled: () =>
        queryClient.invalidateQueries([`${queryKeyForInvalidation}`]),
    }
  );
};

export const useCreate = ({
  resourceName,
  queryKeyForInvalidation,
}: {
  resourceName: string;
  queryKeyForInvalidation: string;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((values: any) => postMethod(`/${resourceName}`, values), {
    onSuccess: () => {
      console.log("success");
      navigate("..");
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () =>
      queryClient.invalidateQueries([`${queryKeyForInvalidation}`]),
  });
};
