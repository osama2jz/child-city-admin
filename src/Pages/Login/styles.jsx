import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  con: {
    display: "flex",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    // alignItems: "center",
    gap:'10px',
    width: "500px",
    padding: "50px",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0px 10px 15px 10px rgb(0,0,0,0.2)",
  },
}));
