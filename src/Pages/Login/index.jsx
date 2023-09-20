import { Container } from "@mantine/core";
import logo from "../../assets/logo.png";
import InputField from "../../components/InputField";
import PassInput from "../../components/PassInput";
import { useForm } from "@mantine/form";
import Button from "../../components/Button";
import axios from "axios";
import { backendUrl } from "../../constants/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";
import { routeNames } from "../../Routes/routeNames";
import { useNavigate } from "react-router";
import { useStyles } from "./styles";

export const Login = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.token) {
      navigate(routeNames.general.landing);
    }
  }, [navigate, user]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{0,6}$/i.test(val)
          ? null
          : "Please enter a valid email",
      password: (value) => (value?.length < 1 ? "Please enter password" : null),
    },
  });

  const handleLogin = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/user/signin"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.user.isAdmin) {
          console.log("here");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate("/");
        } else {
          showNotification({
            title: "Error",
            message: "Wrong Credentials",
            color: "red",
          });
        }
      },
      onError: (response) => {
        showNotification({
          title: "Error",
          message: response.response?.data?.error,
          color: "red",
        });
      },
    }
  );
  return (
    <Container mih="100vh" className={classes.con}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleLogin.mutate(values))}
      >
        <img src={logo} width={"200px"} style={{ margin: "auto" }} />
        <InputField
          label={"Email"}
          placeholder={"example@email.com"}
          form={form}
          validateName={"email"}
        />
        <PassInput
          label={"Password"}
          placeholder={"******"}
          form={form}
          validateName={"password"}
        />
        <Button
          label={"Login"}
          type={"submit"}
          mt="md"
          loading={handleLogin.isLoading}
        />
      </form>
    </Container>
  );
};
