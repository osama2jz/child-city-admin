import { Container, Grid } from "@mantine/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../../components/SelectMenu";
import { useStyles } from "../styles";
import { Columns, filterbyStatus } from "./TableHeaders";
import PageHeader from "../../../components/PageHeader";
import DataGrid from "../../../components/Table";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { routeNames } from "../../../Routes/routeNames";
import { useNavigate } from "react-router";

const ViewBlogs = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status } = useQuery(
    "fetchBlogs",
    () => {
      return axios.get(backendUrl + "/blog", {
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
      return item?.title?.toLowerCase().includes(search.toLowerCase());
    else
      return (
        item?.title?.toLowerCase().includes(search.toLowerCase()) &&
        item?.blocked === blockedFilter
      );
  });
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };
  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Blogs"} />
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
          <Grid.Col sm="6" lg="4">
            <SelectMenu
              placeholder={"Filter by Status"}
              data={filterbyStatus}
              value={blockedFilter}
              onChange={setBlockedFilter}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="3" lg={"2"}>
            <Button
              label={"Clear Filters"}
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="2">
            <Button
              label={"Add Blog"}
              fullWidth
              leftIcon="plus"
              onClick={() => navigate(routeNames.general.addBlog)}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={Columns}
          data={filteredItems}
          progressPending={status === "loading"}
          type="service"
        />
      </Container>
    </Container>
  );
};

export default ViewBlogs;
