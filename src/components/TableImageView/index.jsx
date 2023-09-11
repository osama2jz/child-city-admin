import { Group, Image } from "@mantine/core";
import { HoverCard } from "@mantine/core";

const TableImageView = ({ src }) => {
  return (
    <Group
      position="center"
      style={{
        position: "relative",
      }}
    >
      {/* <HoverCard shadow="md">
        <HoverCard.Target width={40}> */}
          <Image
            src={src}
            fit="fill"
            height={40}
            width={40}
            radius={"50%"}
            alt="IMG"
            withPlaceholder
          />
        {/* </HoverCard.Target>
        <HoverCard.Dropdown
          style={{
            position: "absolute",
            zIndex: 9999,
          }}
        >
          <Image src={src} fit="cover" width={300} />
        </HoverCard.Dropdown>
      </HoverCard> */}
    </Group>
  );
};

export default TableImageView;
