import {
  createStyles,
  Group,
  Modal as ModalMantine,
  Text,
  Container,
} from "@mantine/core";
import cross from "../../assets/cross.svg";
import Button from "../Button";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
}));

const DeleteModal = ({
  opened,
  setOpened,
  onDelete,
  label,
  loading,
  message,
}) => {
  const { classes, cx } = useStyles();
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
    >
      <Container className={classes.root}>
        <img src={cross} alt="icon" width={"40px"} />
        <Text fw={"bold"}>{label}</Text>
        <Text align="center">{message}</Text>
        <Group pt={"sm"} ml={"auto"}>
          <Button
            label="Cancel"
            disabled={loading}
            onClick={() => setOpened(false)}
            variant="outline"
          />
          <Button label="Delete" onClick={onDelete} loading={loading} />
        </Group>
      </Container>
    </ModalMantine>
  );
};
export default DeleteModal;
