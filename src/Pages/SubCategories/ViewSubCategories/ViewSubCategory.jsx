import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Text fw={"bold"} color="primary.0" fz="xl" my={"md"} align="center">
        {rowData?.title}
      </Text>
      <Title order={3}>Category</Title>
      <Text>{rowData?.category?.title}</Text>
      <Title order={3}>Description</Title>
      <Text>{rowData?.description}</Text>
    </Flex>
  );
};
export default ViewProduct;
