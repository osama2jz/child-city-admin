import {
  Anchor,
  Flex,
  Image,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

const ViewExpense = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Title: </Title>
        <Text>{rowData?.name}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Category: </Title>
        <Text>{rowData?.type}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Amount: </Title>
        <Text>{rowData?.amount}</Text>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Payment Receipt: </Title>
        <Anchor color="primary.0">Receipt</Anchor>
      </Flex>
      <Flex justify={"space-between"} mx={50}>
        <Title order={5}>Description: </Title>
        <Text>{rowData?.description}</Text>
      </Flex>
    </Flex>
  );
};
export default ViewExpense;
