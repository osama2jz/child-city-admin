import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import { ActionIcon, Flex, NumberInput, Text } from "@mantine/core";
import { Check } from "tabler-icons-react";
import { useMutation } from "react-query";
import { backendUrl } from "../../../constants/constants";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

const Sale = ({ row, setLoading }) => {
  const [newSale, setNewSale] = useState(row.sale);
  const handleSale = useMutation(
    async (values) => {
      row.sale = newSale;
      setLoading(true);
      return axios.put(`${backendUrl + `/product/${row?._id}`}`, values);
    },
    {
      onSuccess: (response) => {
        setLoading(false);
        showNotification({
          title: "Success",
          message: "Sale Updated Successfully.",
          color: "green",
        });
      },
      onError: (err) => {
        setLoading(false);
        showNotification({
          title: "Error",
          message: "Something Went Wrong.",
          color: "red",
        });
      },
    }
  );

  return (
    <Flex justify={"flex-start"} align={"center"} key={row?._id}>
      <NumberInput
        max={100}
        min={0}
        defaultValue={row?.sale}
        rightSection={<Text>%</Text>}
        w={65}
        onChange={(e) => setNewSale(e)}
      />
      {newSale !== row.sale && (
        <ActionIcon onClick={() => handleSale.mutate(row)}>
          <Check size={20} />
        </ActionIcon>
      )}
    </Flex>
  );
};

export default Sale;
