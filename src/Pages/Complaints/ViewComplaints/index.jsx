import { Container, Grid } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import DataGrid from "../../../components/Table";
import { backendUrl } from "../../../constants/constants";
import { useStyles } from "../styles";
import { Columns } from "./TableHeaders";

const ViewComplaints = () => {
  const { classes } = useStyles();
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status } = useQuery(
    "fetchComplaints",
    () => {
      return axios.get(backendUrl + "/complaint", {
        // headers: {
        //   authorization: `Bearer ${user.token}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.map((item) => {
          item.serialNo = data.indexOf(item) + 1;
        });
        setTableData(data);
      },
    }
  );
  const filteredItems = tableData.filter((item) => {
    if (blockedFilter === null)
      return item?.customerName?.toLowerCase().includes(search.toLowerCase());
    else
      return (
        item?.customerName?.toLowerCase().includes(search.toLowerCase()) &&
        item?.blocked === blockedFilter
      );
  });
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };
  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Complaints"} />
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs">
          <Grid.Col sm="6" lg="4">
            <InputField
              placeholder={"Search Title"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          {/* <Grid.Col sm="6" lg="3"> */}
          {/* <SelectMenu
              placeholder={"Filter by Status"}
              data={filterbyStatus}
              value={blockedFilter}
              onChange={setBlockedFilter}
            />
          </Grid.Col> */}
          <Grid.Col sm="6" md="6" lg={"2"}>
            <Button
              label={"Clear Filters"}
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={Columns(filteredItems)}
          data={filteredItems}
          progressPending={status === "loading"}
          type="service"
        />
      </Container>
    </Container>
  );
};

export default ViewComplaints;
