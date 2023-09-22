import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import PassInput from "../../../components/PassInput";
import { backendUrl } from "../../../constants/constants";
import SelectMenu from "../../../components/SelectMenu";

export const AddUser = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const [admins, setAdmins] = useState(0);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      name: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      isAdmin: false,
    },

    validate: {
      name: (value) =>
        value?.length > 2 && value?.length < 30
          ? null
          : "Please enter full name",
      isAdmin: (value) => (value !== null ? null : "Please Select User Type"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please Enter a valid email",
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        )
          ? null
          : "Password must contain 8 to 15 characters.",
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);

  const handleCheck = (values) => {
    if (values?.isAdmin && state?.count > 4) {
      showNotification({
        title: "Error",
        message: "Admins can not be more than 5.",
        color: "red",
      });
    } else {
      handleSignup.mutate(values);
    }
  };
  const handleSignup = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/user/signup"}`, values, {});
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        navigate(routeNames.general.users);
        form.reset();
      },
      onError: (err) => {
        showNotification({
          title: "Error",
          message: err?.response?.data?.error,
          color: "red",
        });
      },
    }
  );

  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit User" : "Add User"} />
      <form onSubmit={form.onSubmit((values) => handleCheck(values))}>
        <SelectMenu
          label={"User Type"}
          placeholder={"Select User Type"}
          form={form}
          defaultValue={false}
          data={[
            { label: "Admin", value: true },
            { label: "Customer", value: false },
          ]}
          withAsterisk
          validateName={"isAdmin"}
        />
        <InputField
          label={"Full Name"}
          placeholder={"Enter User Name"}
          form={form}
          withAsterisk
          validateName={"name"}
        />
        <InputField
          placeholder="Enter Email"
          label="Email"
          withAsterisk
          form={form}
          validateName={"email"}
        />
        <InputField
          placeholder="Enter Phone Number"
          label="Phone Number"
          form={form}
          validateName={"phoneNumber"}
        />
        <PassInput
          placeholder="*******"
          label="Password"
          form={form}
          withAsterisk
          validateName={"password"}
        />
        <PassInput
          placeholder="*******"
          label="Confirm Password"
          form={form}
          withAsterisk
          validateName={"confirmPassword"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.users)}
          />
          <Button
            label={state?.isUpdate ? "Edit User" : "Add User"}
            type={"submit"}
            loading={handleSignup.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
