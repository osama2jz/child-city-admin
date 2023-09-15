import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewService from "./ViewProduct";

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
    cell: (row) => <TableImageView src={row?.images?.[0]} />,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Category",
    selector: (row) => row.category?.title,
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "SKU",
    selector: (row) => row.sku,
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
    center: true,
    width: "150px",
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
    center: true,
    width: "180px",
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
        type={"Product"}
        queryName="fetchProducts"
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
        viewData={<ViewService rowData={row} />}
        type="Product"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
