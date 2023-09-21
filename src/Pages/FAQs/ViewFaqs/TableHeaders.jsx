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
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Question",
    selector: (row) => row.question,
    sortable: true,
    grow: 1,
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
        type={"Faq"}
        queryName="fetchFaqs"
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
        del={true}
        edit={true}
        viewData={<ViewCategory rowData={row} />}
        type="Faq"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
