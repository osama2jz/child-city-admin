import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.image}
        width="200px"
        withPlaceholder
        height={"200px"}
        fit="cover"
        style={{
          border: `5px solid ${theme.primaryColor}`,
        }}
        styles={{
          root: {
            margin: "auto",
            borderRadius: "10%",
            overflow: "hidden",
          },
        }}
      />
      <Text fw={"bold"} color="primary.0" fz="xl" my={"md"} align="center">
        {rowData?.title}
      </Text>
      <Title order={3}>Description</Title>
      <Text>{rowData?.details}</Text>
    </Flex>
  );
};
export default ViewProduct;
