import { Carousel } from "@mantine/carousel";
import {
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const ViewProduct = ({ rowData }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const theme = useMantineTheme();
  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      w={"100%"}
      gap="md"
      justify={"space-between"}
    >
      <Stack align="center" justify="center">
        <Carousel maw={320} mx="auto" withIndicators height={200}>
          <Carousel.Slide>
            <Image
              src={rowData?.img}
              width="320px"
              height={"200px"}
              withPlaceholder
              fit="fill"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src={rowData?.img}
              width="320px"
              height={"200px"}
              withPlaceholder
              fit="fill"
            />
          </Carousel.Slide>
        </Carousel>
        <Text fw={"bold"} color="primary.0" fz="xl" my={"md"} align="center">
          {rowData?.title}
        </Text>
      </Stack>
      <Stack spacing={"xs"} w={isMobile ? "100%" : "50%"}>
        <Group position="apart">
          <Title order={4}>Category</Title>
          <Text>{rowData?.category}</Text>
        </Group>
        <Group position="apart">
          <Title order={5}>SKU</Title>
          <Text align="justify">{rowData?.sku}</Text>
        </Group>
        <Group position="apart">
          <Title order={5}>Colors</Title>
          <Text align="justify">{rowData?.colors.join(", ")}</Text>
        </Group>
        <Group position="apart">
          <Title order={5}>Sizes</Title>
          <Text align="justify">{rowData?.sizes.join(", ")}</Text>
        </Group>
        <Group position="apart">
          <Title order={5}>Season</Title>
          <Text align="justify">{rowData?.season}</Text>
        </Group>
        <Group position="apart">
          <Title order={5}>Quantity</Title>
          <Text align="justify">{rowData?.quantity}</Text>
        </Group>
        <Title order={5}>Description</Title>
        <Text align="justify">{rowData?.description}</Text>
      </Stack>
    </Flex>
  );
};
export default ViewProduct;
