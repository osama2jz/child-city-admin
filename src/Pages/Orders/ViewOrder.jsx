import {
  Anchor,
  Flex,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

const ViewOrder = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Customer Name: </Title>
        <Text>{rowData?.customerName}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Quantity: </Title>
        <Text>{rowData?.quantity}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Amount: </Title>
        <Text>{rowData?.totalPrice}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Shipping Province: </Title>
        <Text>{rowData?.address.province}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Shipping City: </Title>
        <Text>{rowData?.address.city}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Shipping Address: </Title>
        <Text align="justify" maw={"50%"}>{rowData?.address.address}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Payment Receipt: </Title>
        <Anchor color="primary.0" href={rowData?.paymentReceipt}>
          Receipt
        </Anchor>
      </Flex>
    </Flex>
  );
};
export default ViewOrder;
