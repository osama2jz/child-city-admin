import { Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewService from "./ViewProduct";
import { AlertTriangle } from "tabler-icons-react";
import Sale from "./Sale";

export const Columns =(setLoading)=> [
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
    cell: (row) => (
      <Text style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {row.title} {row.quantity < 6 && <AlertTriangle color="red" />}
      </Text>
    ),
  },
  {
    name: "Category",
    selector: (row) => row.category?.title,
    sortable: true,
    center: true,
    width: "180px",
  },
  {
    name: "Sub Category",
    selector: (row) => row.subCategory?.title,
    sortable: true,
    // center: true,
    width: "200px",
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
    name: "Sale",
    selector: (row) => row.sale,
    sortable: true,
    // center: true,
    width: "150px",
    cell: (row) => <Sale row={row} setLoading={setLoading}/>,
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
