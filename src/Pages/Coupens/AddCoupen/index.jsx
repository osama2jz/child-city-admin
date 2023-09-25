import { Checkbox, Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import TextArea from "../../../components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

export const AddCoupen = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      code: "",
      off: 0,
      oneTime: false,
      description: "",
    },

    validate: {
      name: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter Coupen title",
      code: (value) =>
        value?.length == 11 ? null : "Please enter valid coupen code",
      off: (value) =>
        value > 0 && value <= 100 ? null : "Please enter off amount in percent",
      description: (value) =>
        value?.length > 0 ? null : "Please enter coupen description",
    },
  });
  console.log(form.values);
  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddCoupen = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/coupen/${state?.data?._id}`}`,
          values
          // {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
          //   },
          // }
        );
      else
        return axios.post(`${backendUrl + "/coupen"}`, values, {
          // headers: {
          //   authorization: `Bearer ${user.token}`,
          // },
        });
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        navigate(routeNames.general.viewCoupens);
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
      <PageHeader label={state?.isUpdate ? "Edit Coupen" : "Add Coupen"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddCoupen.mutate(values))}
      >
        <InputField
          label={"Coupen Name"}
          placeholder={"Enter Coupen name"}
          form={form}
          withAsterisk
          validateName={"name"}
        />
        <InputField
          label={"Coupen Code"}
          placeholder={"Enter Coupen Code"}
          form={form}
          withAsterisk
          validateName={"code"}
        />
        <InputField
          label={"Off Amount (%)"}
          placeholder={"Enter Off Amount in percent"}
          form={form}
          withAsterisk
          type="number"
          validateName={"off"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Checkbox
          label="One Time"
          checked={form.values.oneTime}
          {...form.getInputProps("oneTime")}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewCoupens)}
          />
          <Button
            label={state?.isUpdate ? "Edit Coupen" : "Add Coupen"}
            type={"submit"}
            loading={handleAddCoupen.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
