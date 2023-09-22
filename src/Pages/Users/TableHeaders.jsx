import { Anchor, Text } from "@mantine/core";
import ActionIcons from "../../components/ActionIcons";
import StatusToggle from "../../components/StatusToggle";
import TableImageView from "../../components/TableImageView";
export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "User Type",
    selector: (row) => row.isAdmin,
    sortable: true,
    // center: true,
    width: "200px",
    cell: (row) => <Text>{row.isAdmin ? "Admin" : "Customer"}</Text>,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phoneNumber,
    sortable: true,
    center: true,
    width: "200px",
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
        type={"User"}
        queryName="fetchUsers"
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
        // view={true}
        del={true}
        // edit={true}
        type="User"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
