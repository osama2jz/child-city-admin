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
      <Image
        src={rowData?.img}
        width="200px"
        height={"200px"}
        mx="auto"
        fit="fill"
        withPlaceholder
      />
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Customer Name: </Title>
        <Text>{rowData?.customerName}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Product Name: </Title>
        <Text>{rowData?.productName}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Quantity: </Title>
        <Text>{rowData?.quantity}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Amount: </Title>
        <Text>{rowData?.amount}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Shipping Address: </Title>
        <Text>{rowData?.address}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Payment Receipt: </Title>
        <Anchor color="primary.0">Receipt</Anchor>
      </Flex>
    </Flex>
  );
};
export default ViewOrder;
