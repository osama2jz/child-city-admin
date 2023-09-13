import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  main:{
    display:"flex",
    flexDirection:'column',
    gap:'10px',
    padding:'20px'
  },
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
  graph: {
    border: "2px dashed rgb(0,0,0,0.2)",
    borderRadius:'20px',
    padding:'20px',
    backgroundColor:'rgb(0,0,0,0.02)'
  },
}));
