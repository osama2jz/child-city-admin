import { Anchor, Badge } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewService from "./ViewExpense";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.name,
    sortable: true,
    // center: true,
    grow:1
  },
  {
    name: "Expense Type",
    selector: (row) => row.type,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    center: true,
    width: "150px",
  },
  {
    name: "Receipt",
    selector: (row) => row.payment,
    sortable: true,
    width: "120px",
    cell: (row) => (
      <Anchor color="primary.0">{row?.receipt || "Receipt"}</Anchor>
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "150px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        edit={true}
        viewData={<ViewService rowData={row} />}
        type="Expenses"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Paid", value: true },
  { label: "Pending", value: false },
];
