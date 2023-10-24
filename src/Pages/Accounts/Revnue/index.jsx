import { Container, Grid, Group, SimpleGrid } from "@mantine/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../../components/SelectMenu";
import { useStyles } from "./styles";
import { Columns, filterbyStatus } from "./TableHeaders";
import PageHeader from "../../../components/PageHeader";
import DataGrid from "../../../components/Table";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { routeNames } from "../../../Routes/routeNames";
import { useNavigate } from "react-router";
import { DateInput, DatePicker } from "@mantine/dates";

const ViewRevenue = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const [dates, setDates] = useState({
    from: oneMonthAgo,
    to: new Date(),
  });
  const [tableData, setTableData] = useState([
    {
      serialNo: 1,
      name: "Some Person",
      productName: "Denim Jeans",
      amount: "500",
      quantity: "2",
      payment: 3500,
      address: "f-10 markaz, Islambad, Pakistan",
      paymentStatus: true,
    },
  ]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);

  const { status } = useQuery(
    "fetchRevenue",
    () => {
      return axios.get(backendUrl + "/revenue", {
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
    console.log(dates.to, dates.from, item.createdAt)
    return (
      item?.title?.toLowerCase().includes(search.toLowerCase()) &&
      new Date(item.createdAt) >= new Date(dates.from) &&
      new Date(item.createdAt) <= new Date(dates.to)
    );
  });
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
  };
  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Revenue"} />
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs" grow>
          <Grid.Col md="6">
            <InputField
              placeholder={"Search Title"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg={"3"}>
            <Button
              label={"Clear Filters"}
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg={"3"}>
            <Button
              label={"Add Revenue"}
              fullWidth
              onClick={() => navigate(routeNames.general.addRevenue)}
            />
          </Grid.Col>
        </Grid>
        <SimpleGrid cols={2} mb="md">
          <DateInput
            label="From"
            size="md"
            defaultValue={dates.from}
            onChange={(e) => setDates({ ...dates, from: e })}
          />
          <DateInput
            label="To"
            size="md"
            defaultValue={dates.to}
            maxDate={new Date()}
            onChange={(e) => setDates({ ...dates, to: e })}
          />
        </SimpleGrid>
        <DataGrid
          columns={Columns}
          data={filteredItems}
          download={true}
          // progressPending={status === "loading"}
          type="Revenue"
        />
      </Container>
    </Container>
  );
};

export default ViewRevenue;
