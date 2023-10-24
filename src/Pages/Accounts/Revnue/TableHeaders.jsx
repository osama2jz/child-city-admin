import { Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import ViewOrder from "../../Orders/ViewOrder";

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
    name: "Revenue Title",
    selector: (row) => row?.title,
    sortable: true,
    // center: true,
    grow: 1,
    cell: (row) => <Text>{row?.title || "N/A"}</Text>,
  },
  {
    name: "Date",
    selector: (row) => row?.createdAt,
    sortable: true,
    // center: true,
    grow: 1,
    cell: (row) => <Text>{new Date(row?.createdAt).toLocaleDateString() || "NA"}</Text>,
  },
  {
    name: "Amount",
    selector: (row) => row.totalPrice,
    sortable: true,
    center: true,
    width: "150px",
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
        disabledView={!row?.orderId}
        viewSize="auto"
        viewData={<ViewOrder rowData={row} />}
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
