import { Anchor, Text } from "@mantine/core";
import ActionIcons from "../../components/ActionIcons";
import ViewService from "./ViewOrder";
import OrderStatusToggle from "../../components/OrderStatusToggle";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Order #",
    selector: (row) => row?.orderNo,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Customer Name",
    selector: (row) => row?.userId,
    sortable: true,
    // center: true,
    width: "250px",
    cell: (row) => <Text>{row?.userId?.name || "Guest User"}</Text>,
  },
  {
    name: "City",
    selector: (row) => row.address.city,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Total Items",
    selector: (row) => row.product,
    sortable: true,
    center: true,
    width: "150px",
    cell: (row) => (
      <Text>{row.product.reduce((a, curr) => a + curr.quantity, 0)}</Text>
    ),
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
    width: "150px",
    cell: (row) =>
      row?.paymentMode !== "cod" ? (
        <Anchor color="primary.0" href={row?.paymentReceipt} target="_blank">
          {"Receipt"}
        </Anchor>
      ) : (
        <Text align="center">COD</Text>
      ),
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => <OrderStatusToggle status={row?.status} id={row?._id} />,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        viewSize="auto"
        view={true}
        del={true}
        // edit={true}
        viewData={<ViewService rowData={row} />}
        type="Order"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  "Pending",
  "Dispatched",
  "Delivered",
];
