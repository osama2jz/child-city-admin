import { ActionIcon, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { ArrowNarrowDown, ArrowNarrowUp } from "tabler-icons-react";
import { backendUrl } from "../../../constants/constants";
import axios from "axios";

const ChangeOrder = ({ ind, rows }) => {
  const queryClient = useQueryClient();
  const changeOrder = (type) => {
    let ids = rows.map((obj) => obj._id);
    if (type == "up") {
      const temp = ids[ind];
      ids[ind] = ids[ind - 1];
      ids[ind - 1] = temp;
    } else {
      const temp = ids[ind];
      ids[ind] = ids[ind + 1];
      ids[ind + 1] = temp;
    }
    handleChangeOrder.mutate({ ids });
  };
  const handleChangeOrder = useMutation(
    (values) => {
      return axios.patch(`${backendUrl + "/category/changeOrder"}`, values, {});
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        queryClient.invalidateQueries("fetchCategories");
      },
      onError: (err, res) => {
        showNotification({
          title: "Error",
          message: err?.response?.data?.error,
          color: "red",
        });
      },
    }
  );

  return (
    <Flex>
      <ActionIcon disabled={ind == 0}>
        <ArrowNarrowUp onClick={() => changeOrder("up")} />
      </ActionIcon>
      <ActionIcon disabled={ind == rows.length - 1}>
        <ArrowNarrowDown onClick={() => changeOrder("down")} />
      </ActionIcon>
    </Flex>
  );
};

export default ChangeOrder;
