import { Container, Group, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import TextArea from "../../../components/TextArea";
import { UserContext } from "../../../contexts/UserContext";

export const AddSale = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      sale: "",
      description: "",
      blocked: true,
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter Sale title",
      sale: (value) =>
        value?.length > 1 && value > 0 ? null : "Please enter sale percent",
      description: (value) =>
        value?.length > 0 ? null : "Please enter Sale description",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddService = useMutation((values) => {
    //   if (state?.isUpdate)
    //     return axios.patch(
    //       `${backendUrl + `/api/v1/service/${state?.data?._id}`}`,
    //       values,
    //       {
    //         headers: {
    //           authorization: `Bearer ${user.token}`,
    //         },
    //       }
    //     );
    //   else
    //     return axios.post(`${backendUrl + "/api/v1/service"}`, values, {
    //       headers: {
    //         authorization: `Bearer ${user.token}`,
    //       },
    //     });
    // },
    // {
    //   onSuccess: (response) => {
    //     if (response.data?.success) {
    //       showNotification({
    //         title: "Success",
    //         message: response?.data?.message,
    //         color: "green",
    //       });
    //       navigate(routeNames.general.viewService);
    //       form.reset();
    //     } else {
    //       showNotification({
    //         title: "Error",
    //         message: response?.data?.message,
    //         color: "red",
    //       });
    //     }
    //   },
  });
  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Sale" : "Add Sale"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Sale Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <InputField
          label={"Sale Percent"}
          placeholder={"Enter Sale Amount in Percent"}
          form={form}
          withAsterisk
          type="number"
          validateName={"sale"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Switch
          label="Default Activation Status"
          defaultChecked={!form.values.blocked}
          {...form.getInputProps("blocked")}
          labelPosition="left"
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewSales)}
          />
          <Button
            label={state?.isUpdate ? "Edit Sale" : "Add Sale"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
