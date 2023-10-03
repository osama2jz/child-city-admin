import { Switch } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { backendUrl } from "../../../constants/constants";
import { showNotification } from "@mantine/notifications";

const DisplayHome = ({ data, allData }) => {
  const total = allData.reduce(
    (acc, curr) => (curr.showOnHome ? acc + 1 : acc + 0),
    0
  );
  const queryClient = useQueryClient();
  const handleShowOnHome = useMutation(
    async (value) => {
      const values = data;
      values.showOnHome = value;
      return axios.put(`${backendUrl + `/product/${data?._id}`}`, values);
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        queryClient.invalidateQueries("fetchProducts");
      },
    }
  );
  return (
    <Switch
      key={data._id}
      defaultChecked={data.showOnHome}
      disabled={total > 11 && !data.showOnHome}
      color="primary.0"
      onChange={(e) => handleShowOnHome.mutate(e.target.checked)}
    />
  );
};

export default DisplayHome;
