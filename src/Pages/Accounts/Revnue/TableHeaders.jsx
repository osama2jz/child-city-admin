import { Anchor, Badge, Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
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
    selector: (row) => row?.customerName,
    sortable: true,
    // center: true,
    grow: 1,
    cell: (row) => <Text>{row?.customerName || "Guest User"}</Text>,
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
    width: "120px",
    cell: (row) => (
      <Anchor color="primary.0" href={row?.paymentReceipt}>
        {"Receipt"}
      </Anchor>
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
        type="Revenue"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Paid", value: true },
  { label: "Pending", value: false },
];
