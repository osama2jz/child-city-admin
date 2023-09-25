import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Title order={3}>Name</Title>
      <Text>{rowData?.customerName}</Text>
      <Title order={3}>Subject</Title>
      <Text>{rowData?.subject}</Text>
      <Title order={3}>Description</Title>
      <Text>{rowData?.description}</Text>
    </Flex>
  );
};
export default ViewProduct;
