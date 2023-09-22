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
    <Stack spacing={"xs"} w={"90%"}>
      <Carousel
        w={isMobile ? 350 : 300}
        withIndicators
        slidesToScroll={1}
        mx="auto"
        slideSize={"100%"}
        height={isMobile ? 350 : 300}
      >
        {rowData?.images.map((obj, ind) => (
          <Carousel.Slide key={ind} style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={obj}
              width={300}
              height={300}
              withPlaceholder
              fit="cover"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Text fw={"bold"} color="primary.0" fz="xl" my={"md"} align="center">
        {rowData?.title}
      </Text>
      <Group position="apart">
        <Title order={4}>Category</Title>
        <Text>{rowData?.category?.title}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>SKU</Title>
        <Text align="justify">{rowData?.sku}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Colors</Title>
        <Text align="justify" maw={'60%'}>{rowData?.colors.join(", ")}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Sizes</Title>
        <Text align="justify">{rowData?.sizes.join(", ")}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Sub Category</Title>
        <Text align="justify">{rowData?.subCategory.title}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Actual Price</Title>
        <Text align="justify">{rowData?.actualPrice}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Retail Price</Title>
        <Text align="justify">{rowData?.price}</Text>
      </Group>
      <Group position="apart">
        <Title order={5}>Quantity</Title>
        <Text align="justify">{rowData?.quantity}</Text>
      </Group>
      <Title order={5}>Description</Title>
      <Text align="justify">{rowData?.description}</Text>
    </Stack>
  );
};
export default ViewProduct;
