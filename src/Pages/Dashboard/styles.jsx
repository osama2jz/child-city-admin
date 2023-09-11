import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "10px",
    width: "150px",
    height: "150px",
    cursor: "pointer",
    backgroundColor: theme.colors.primary,
  },
}));
