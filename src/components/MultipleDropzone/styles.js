import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  fieldset: {
    border: "2px solid #E2E4E5",
    padding: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    maxWidth: "100%",
  },
  imageDeleteButton: {
    position: "absolute",
    zIndex: "1",
    top: "5px",
    right: "10px",
    color: "white",
    borderRadius: "50%",
    width: 20,
    height: 20,
    cursor:'pointer',
    backgroundColor:'gray',
    "&:hover": {
      background: "red",
      color: "white",
    },
  },
}));
