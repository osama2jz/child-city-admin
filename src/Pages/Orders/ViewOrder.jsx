import {
  Box,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants/constants";

const ViewOrder = ({ rowData }) => {
  const [receipt, setReceipt] = useState(rowData);
  const invoice = useRef();
  const printInvoice = useReactToPrint({
    content: () => invoice.current,
  });

  const { status } = useQuery(
    "fetchSingleOrder",
    () => {
      return axios.get(backendUrl + `/order/single/${rowData?.orderId}`, {});
    },
    {
      onSuccess: (res) => {
        let data = res.data.data;
        // console.log(data)
        setReceipt(data);
      },
    },
    { enabled: !!rowData?.orderId }
  );

  return (
    <Flex direction={"column"} w={"100%"} align={"flex-end"}>
      <Button label={"Print"} onClick={() => printInvoice()} />
      <Box
        ref={invoice}
        // miw={1000}
        style={{
          border: "2px dashed rgb(0,0,0,0.1)",
          marginBlock: "50px",
          borderRadius: "20px",
          padding: "50px",
          margin: "50px",
          //   transform: isMobile ? "scale(0.7)" : "",
        }}
      >
        <Group position="right">
          <Title style={{ margin: "auto" }}> Order Invoice</Title>
          <Image src={logo} width={100} />
        </Group>
        <Stack>
          <Text>
            <b>Name: </b>
            {receipt.name}
          </Text>
          <Text>
            <b>Email: </b>
            {receipt.email}
          </Text>
          <Text>
            <b>Phone: </b>
            {receipt.phone}
          </Text>
          <Text>
            <b>Order #: </b>
            {receipt?.orderNo}
          </Text>
          <Text>
            <b>Date: </b>
            {new Date().toLocaleDateString()}
          </Text>
          <Text>
            <b>Delivery Address: </b>
            {receipt?.address?.address +
              ", " +
              receipt?.address?.city +
              ", " +
              receipt?.address?.province}
          </Text>
          <Title align="center" order={3}>
            {" "}
            Order Details
          </Title>
          <Grid bg="rgb(0,0,0,0.1)">
            <Grid.Col span={2}>
              <Title order={5}>Qty.</Title>
            </Grid.Col>
            <Grid.Col span={6}>
              <Title order={5}>Product</Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Title order={5}>Unit Price</Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Title order={5}>Amount</Title>
            </Grid.Col>
          </Grid>
          {receipt.product.map((obj, ind) => (
            <Grid key={ind}>
              <Grid.Col span={2}>
                <Text order={5}>{obj?.quantity}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  <Image src={obj?.product?.images[0]} width={50} />
                  <Box>
                    <Text fw="bold">{obj?.product?.title}</Text>
                    {obj?.product?.selectedColor && (
                      <Text fz={"sm"}>
                        Color: {obj?.product?.selectedColor}
                      </Text>
                    )}
                    {obj?.product?.selectedSize && (
                      <Text fz={"sm"}>Size: {obj?.product?.selectedSize}</Text>
                    )}
                  </Box>
                </Group>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text>
                  Rs.{" "}
                  {obj?.product?.sale > 0
                    ? (obj?.product?.price * (100 - obj?.product?.sale)) / 100
                    : obj?.product?.price}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text>
                  Rs.{" "}
                  {obj?.product?.sale > 0
                    ? Math.round(
                        ((obj?.product?.price * (100 - obj?.product?.sale)) /
                          100) *
                          obj?.quantity
                      )
                    : obj?.product?.price * obj?.quantity}
                </Text>
              </Grid.Col>
            </Grid>
          ))}
          <Group position="right">
            <Text>SubTotal: {receipt?.subtotal}</Text>
          </Group>
          <Group position="right">
            <Text>Delivery: {receipt?.totalPrice > 3000 ? 0 : 149}</Text>
          </Group>
          <Group position="right">
            {receipt?.coupen > 0 && <Text>Coupen Discount: </Text>}
            {receipt?.coupen > 0 && <Text>{receipt?.coupen}% </Text>}
          </Group>
          <Group position="right">
            <Text fw={"bold"}>Total: {receipt?.totalPrice}</Text>
          </Group>
        </Stack>
      </Box>
    </Flex>
  );
};
export default ViewOrder;
