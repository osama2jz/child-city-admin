import { Anchor } from "@mantine/core";
import ActionIcons from "../../components/ActionIcons";
import StatusToggle from "../../components/StatusToggle";
import TableImageView from "../../components/TableImageView";
import ViewService from "./ViewCategory";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.coverImage,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.coverImage} />,
  },
  {
    name: "Title",
    selector: (row) => row.name,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Product Name",
    selector: (row) => row.productName,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Quantity",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    center: true,
    width: "150px",
  },
  {
    name: "Payment",
    selector: (row) => row.payment,
    sortable: true,
    // center: true,
    width: "200px",
    cell: (row) => <Anchor>{row?.receipt || "Receipt"}</Anchor>,
  },
  {
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.blocked}
        id={row._id}
        type={"service"}
        queryName="fetchServices"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "200px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        // del={true}
        // edit={true}
        viewData={<ViewService rowData={row} />}
        type="Category"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
