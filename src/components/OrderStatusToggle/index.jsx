import { Badge, Loader, Menu } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { showNotification } from "@mantine/notifications";

const OrderStatusToggle = ({ status, id }) => {
  const { user } = useContext(UserContext);
  const [statuss, setStatuss] = useState(status);
  const queryClient = useQueryClient();

  useEffect(() => {
    setStatuss(status);
  }, [status]);
  //to change status
  const handleStatusChange = useMutation(
    async (values) => {
      const link = backendUrl + `/order/changeStatus/${id}`;
      return axios.post(
        link,
        values
        //     {
        //       // headers: {
        //       //   authorization: `Bearer ${user.token}`,
        //       // },
        //     }
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("fetchOrders");
        showNotification({
          title: "Success",
          message: `Order status changed successfully`,
          color: "green",
        });
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: `Something went wrong`,
          color: "red",
        });
      },
    }
  );

  if (handleStatusChange.isLoading) {
    return <Loader style={{ margin: "auto" }} size="sm" />;
  }
  return (
    <Menu
      trigger="hover"
      openDelay={100}
      closeDelay={400}
      position="bottom"
      style={{
        cursor: "pointer",
      }}
    >
      <Menu.Target>
        <Badge
          variant="gradient"
          w="100px"
          bg={
            statuss === "Cancelled"
              ? "gray"
              : statuss === "Delivered"
              ? "primary.0"
              : statuss === "Dispatched"
              ? "cyan"
              : ""
          }
        >
          {statuss}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => handleStatusChange.mutate({ status: "Pending" })}
        >
          Pending
        </Menu.Item>
        <Menu.Item
          onClick={() => handleStatusChange.mutate({ status: "Dispatched" })}
        >
          Dispatched
        </Menu.Item>
        <Menu.Item
          onClick={() => handleStatusChange.mutate({ status: "Delivered" })}
        >
          Delivered
        </Menu.Item>
        <Menu.Item
          onClick={() => handleStatusChange.mutate({ status: "Cancelled" })}
        >
          Cancelled
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default OrderStatusToggle;
