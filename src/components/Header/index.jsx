import { Flex, Image, Text, Title } from "@mantine/core";
import logo from "../../assets/logo.png";
import { Logout } from "tabler-icons-react";
import { useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "@mantine/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 820px)");

  const { setUser } = useContext(UserContext);
  return (
    <Flex
      w={"100vw"}
      style={{ color: "black" }}
      justify={"space-between"}
      align={"center"}
    >
      <Image
        src={logo}
        width={isMobile ? 40 : "80px"}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <Title order={isMobile ? 5 : 3} color={"#ff8087"}>
        Admin Panel
      </Title>
      <Flex
        gap={"sm"}
        align={"center"}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "red",
          },
        }}
        onClick={() => {
          localStorage.clear();
          setUser({});
          navigate(routeNames.general.login);
        }}
      >
        <Logout />
        {!isMobile && <Text> Logout</Text>}
      </Flex>
    </Flex>
  );
};
