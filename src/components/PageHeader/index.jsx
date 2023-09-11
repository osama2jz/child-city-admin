import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const PageHeader = ({ label, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");

  return (
    <Text
      size={isMobile ? 30 : 40}
      weight={700}
      align="center"
      mb="md"
      {...props}
      color="rgb(0,0,0,0.9)"
    >
      {label}
    </Text>
  );
};
export default PageHeader;
