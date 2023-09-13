import { Container, Grid } from "@mantine/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../components/SelectMenu";
import { useStyles } from "./styles";
import { Columns, filterbyStatus } from "./TableHeaders";
import PageHeader from "../../components/PageHeader";
import DataGrid from "../../components/Table";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import { backendUrl } from "../../constants/constants";
import { routeNames } from "../../Routes/routeNames";
import { useNavigate } from "react-router";

const Users = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([
    {
      serialNo: 1,
      name: "Some Person",
      email: "example@gmail.com",
      phone: "+932342423",
      blocked: false,
    },
  ]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status } = useQuery("fetchServices", () => {
    //   return axios.get(backendUrl + "/api/v1/service", {
    //     headers: {
    //       authorization: `Bearer ${user.token}`,
    //     },
    //   });
    // },
    // {
    //   onSuccess: (res) => {
    //     const data = res.data.data;
    //     data.map((item) => {
    //       item.serialNo = data.indexOf(item) + 1;
    //     });
    //     setTableData(data);
    //   },
  });
  const filteredItems = tableData.filter((item) => {
    if (blockedFilter === null)
      return item?.name?.toLowerCase().includes(search.toLowerCase());
    else
      return (
        item?.name?.toLowerCase().includes(search.toLowerCase()) &&
        item?.blocked === blockedFilter
      );
  });
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };
  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Users"} />
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs">
          <Grid.Col md="6" lg="3">
            <InputField
              placeholder={"Search Title"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg="3">
            <SelectMenu
              placeholder={"Filter by Status"}
              data={filterbyStatus}
              value={blockedFilter}
              onChange={setBlockedFilter}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="3" lg={"2"} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              variant="outline"
              onClick={handleClearFilters}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={Columns}
          data={filteredItems}
          // progressPending={status === "loading"}
          type="service"
        />
      </Container>
    </Container>
  );
};

export default Users;
