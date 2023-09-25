import { Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewCategory from "./ViewCategory";
export const Columns = (data) => [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row.customerName,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Subject",
    selector: (row) => row.subject,
    sortable: true,
    // center: true,
    width: "300px",
  },
  {
    name: "Complaint Date",
    selector: (row) => row.createdAt,
    sortable: true,
    // center: true,
    width: "300px",
    cell: (row) => <Text>{new Date(row.createdAt).toLocaleDateString()}</Text>,
  },

  // {
  //   name: "Status",
  //   selector: (row) => row.blocked,
  //   width: "150px",
  //   sortable: true,
  //   center: true,
  //   cell: (row) => (
  //     <StatusToggle
  //       status={row.blocked}
  //       id={row._id}
  //       type={"Category"}
  //       queryName="fetchCategories"
  //     />
  //   ),
  // },
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
        viewData={<ViewCategory rowData={row} />}
        type="Complaint"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
