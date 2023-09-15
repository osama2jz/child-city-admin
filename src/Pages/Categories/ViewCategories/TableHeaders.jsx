import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewCategory from "./ViewCategory";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.image,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.image} />,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Sub Title",
    selector: (row) => row.subTitle,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Short Description",
    selector: (row) => row.description,
    sortable: true,
    // center: true,
    width: "300px",
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
        type={"Category"}
        queryName="fetchCategories"
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
        edit={true}
        viewData={<ViewCategory rowData={row} />}
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
