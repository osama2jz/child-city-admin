import axios from "axios";
import { Container, Group, SimpleGrid } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import SelectMenu from "../../../components/SelectMenu";

const AddExpenses = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
      type: "",
      amount: "",
      image: null,
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter expenses title",
      amount: (value) =>
        value?.length > 0 && amount > 0 ? null : "Please enter amount",
      description: (value) =>
        value?.length > 0 ? null : "Please enter expenses description",
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
      <PageHeader label={state?.isUpdate ? "Edit Expenses" : "Add Expenses"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Title"}
          form={form}
          withAsterisk
          validateName={"name"}
        />
        <SimpleGrid cols={2}>
          <SelectMenu
            data={["Marketing", "Stock", "Others"]}
            label="Expense Type"
            placeholder="Select Expense Type"
            form={form}
            validateName="type"
          />
          <InputField
            label={"Amount"}
            placeholder={"Enter Amount"}
            form={form}
            type="number"
            withAsterisk
            validateName={"amount"}
          />
        </SimpleGrid>
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Group position="center">
          <DropZone
            form={form}
            folderName={"service"}
            name={"coverImage"}
            label="Image"
          />
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewExpesnes)}
          />
          <Button
            label={state?.isUpdate ? "Edit Expenses" : "Add Expenses"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
export default AddExpenses;
