import {
  Container,
  Group,
  Modal as ModalMantine,
  createStyles
} from "@mantine/core";
import Button from "../Button";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
}));

const ViewModal = ({ opened, setOpened, children, title }) => {
  const { classes } = useStyles();
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      title={title}
      centered
      radius={"lg"}
      size={"lg"}
      styles={{
        overlay: {
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Container className={classes.root} p="0px" size={"xl"}>
        {children}
        <Group pt={"sm"} position="center">
          <Button label="Close" onClick={() => setOpened(false)} />
        </Group>
      </Container>
    </ModalMantine>
  );
};
export default ViewModal;
