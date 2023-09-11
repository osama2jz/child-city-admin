import { Flex, Image, Text, Title } from "@mantine/core";
import logo from "../../assets/logo.png";
import { Logout } from "tabler-icons-react";
import { useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
  const navigate = useNavigate();
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
        width={"80px"}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <Title order={3} color={"#ff8087"}>
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
        <Text> Logout</Text>
      </Flex>
    </Flex>
  );
};
