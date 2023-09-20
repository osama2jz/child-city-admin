import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import PassInput from "../../components/PassInput";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";

export const Settings = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },

    validate: {
      oldPassword: (value) =>
        value?.length > 0 ? null : "Please enter old password",
      newPassword: (value) =>
        value?.length > 0 ? null : "Please enter new password",
      confirmPass: (value, values) =>
        value?.length > 0 && values?.newPassword === value
          ? null
          : "Please enter confirm password",
    },
  });

  const handleChangePassword = useMutation(
    (values) => {
      return axios.put(
        `${backendUrl + `/user/changePassword/${user?.userId}`}`,
        values,
        {
          // headers: {
          //   authorization: `Bearer ${user.token}`,
          // },
        }
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        form.reset();
      },
      onError: (err) => {
        showNotification({
          title: "Error",
          message: "Something Went Wrong",
          color: "red",
        });
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader label={"Settings"} />
      <form
        onSubmit={form.onSubmit((values) =>
          handleChangePassword.mutate(values)
        )}
      >
        <PassInput
          label={"Old Password"}
          placeholder={"Enter Old Password"}
          form={form}
          withAsterisk
          validateName={"oldPassword"}
        />
        <PassInput
          label={"New Password"}
          placeholder={"Enter New Password"}
          form={form}
          withAsterisk
          validateName={"newPassword"}
        />
        <PassInput
          label={"Confirm Password"}
          placeholder={"Enter Confirm Password"}
          form={form}
          withAsterisk
          validateName={"confirmPass"}
        />

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.landing)}
          />
          <Button
            label={"Save Settings"}
            type={"submit"}
            loading={handleChangePassword.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
