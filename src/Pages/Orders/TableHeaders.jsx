import { Anchor, Text } from "@mantine/core";
import ActionIcons from "../../components/ActionIcons";
import StatusToggle from "../../components/StatusToggle";
import TableImageView from "../../components/TableImageView";
import ViewService from "./ViewOrder";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row?.userId,
    sortable: true,
    // center: true,
    width: "250px",
    cell: (row) => <Text>{row?.userId?.name || "Guest User"}</Text>,
  },
  {
    name: "City",
    selector: (row) => row.address.city,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Total Items",
    selector: (row) => row.product,
    sortable: true,
    center: true,
    width: "150px",
    cell: (row) => (
      <Text>{row.product.reduce((a, curr) => a + curr.quantity, 0)}</Text>
    ),
  },
  {
    name: "Amount",
    selector: (row) => row.totalPrice,
    sortable: true,
    center: true,
    width: "150px",
  },
  {
    name: "Payment",
    selector: (row) => row.paymentReceipt,
    sortable: true,
    // center: true,
    width: "150px",
    cell: (row) => (
      <Anchor color="primary.0" href={row?.paymentReceipt}>
        {"Receipt"}
      </Anchor>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.delivered}
        id={row._id}
        type={"order"}
        queryName="fetchServices"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        // del={true}
        // edit={true}
        viewData={<ViewService rowData={row} />}
        type="Order"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  "Pending",
  "Dispatched",
  "Delivered",
];
