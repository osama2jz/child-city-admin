import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewService = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.coverImage}
        width="200px"
        height={"200px"}
        fit="fill"
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
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.title}
      </Text>
      <Title order={3}>Short Description</Title>
      <Text>{rowData?.shortDescription}</Text>
      <Title order={3}>Detail Description</Title>
      <Text align="justify">{rowData?.description}</Text>
      <Title order={3}>Detail View Image</Title>
      <Image
        src={rowData?.homeImage}
        width="70%"
      />
    </Flex>
  );
};
export default ViewService;
