import { createStyles, Navbar, ScrollArea } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LinksGroup } from "./NavBarLinksGroup";
import { sidebarData } from "./sidebarData";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.white,
    boxShadow: "5px 10px 10px rgb(0,0,0,0.1)",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colors.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.white,
    // backgroundColor:
    //   role === "Social Worker" ? "pink" : role === "Admin" ? "white" : "teal",
    margin: "5px",
    borderRadius: "10px",
  },

  linksInner: {},
}));

export function SideBar({ setOpened, opened }) {
  const { user } = useContext(UserContext);
  const { classes } = useStyles();
  const [globalOpen, setGlobalOpen] = useState("");
  const links = sidebarData?.map((item, ind) => (
    <LinksGroup
      {...item}
      key={ind}
      ind={ind + 1}
      link={item.link}
      globalOpen={globalOpen}
      setGlobalOpen={setGlobalOpen}
      setSideOpen={setOpened}
    />
  ));

  return (
    <Navbar width={{ sm: 250, lg: 300 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
