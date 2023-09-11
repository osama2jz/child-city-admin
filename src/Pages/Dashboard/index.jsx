import { useContext, useState } from "react";
import axios from "axios";
import { Loader, SimpleGrid } from "@mantine/core";
import PageHeader from "../../components/PageHeader";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { useQuery } from "react-query";
import Card from "./Card"

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  const { status } = useQuery(
    "fetchDashboard",
    () => {
      return axios.get(backendUrl + "/api/v1/dashboard", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setData(data);
      },
    }
  );
  return (
    <>
      <PageHeader label={"Dashboard"} />
      {status === "loading" ? (
        <Loader style={{ width:'100%', margin: "auto" }} />
      ) : (
        <SimpleGrid
          verticalSpacing={"xl"}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: "lg", cols: 4 },
          ]}
        >
          {data.map((obj, ind) => (
            <Card key={ind} data={obj} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
