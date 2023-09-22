import { Center, Container, Group, Loader, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { UserContext } from "../../../contexts/UserContext";
import SaleItem from "./SaleItem";
import { useMutation, useQuery } from "react-query";
import { backendUrl } from "../../../constants/constants";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

export const AddSale = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [sales, setSale] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const { status } = useQuery(
    "fetchSales",
    () => {
      return axios.get(backendUrl + "/sale", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.map((item) => {
          item.serialNo = data.indexOf(item) + 1;
        });
        setSale(data);
      },
    }
  );
  const handleAddSale = useMutation(
    () => {
      return axios.post(`${backendUrl + "/sale"}`, sales, {});
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader label={"Sales"} />
      {status === "loading" ? (
        <Center>
          <Loader my="100px" />
        </Center>
      ) : sales.length > 0 ? (
        sales.map((obj, ind) => (
          <SaleItem
            key={ind}
            data={obj}
            setData={setSale}
            ind={ind}
            sales={sales}
            setDisableButton={setDisableButton}
          />
        ))
      ) : (
        <Title color="gray" my="100px" align="center">
          No Sale Found
        </Title>
      )}
      <Group position="right" mt={"md"}>
        <Button
          label={"Add More"}
          variant={"outline"}
          onClick={() =>
            setSale([
              ...sales,
              { category: "", sale: 0, subCategory: [], blocked: true },
            ])
          }
        />
        <Button
          label={"Save"}
          loading={handleAddSale.isLoading}
          disabled={disableButton}
          onClick={() => handleAddSale.mutate(sales)}
        />
      </Group>
    </Container>
  );
};
