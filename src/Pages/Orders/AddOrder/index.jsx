import { Container, Divider, Group, SimpleGrid } from "@mantine/core";
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
import SelectMenu from "../../../components/SelectMenu";

export const AddOrder = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      code: "",
      off: 0,
      description: "",
    },

    validate: {
      name: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter Coupen title",
      code: (value) =>
        value?.length == 8 ? null : "Please enter valid coupen code",
      off: (value) =>
        value > 0 && value <= 100 ? null : "Please enter off amount in percent",
      description: (value) =>
        value?.length > 0 ? null : "Please enter coupen description",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddOrder = useMutation(
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
      <PageHeader label={"Add Order"} />
      <form onSubmit={form.onSubmit((values) => handleAddOrder.mutate(values))}>
        <Divider label="Customer Details" labelPosition="center" />
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 1 },
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 4 },
          ]}
        >
          <SelectMenu
            label="Select Customer"
            placeholder="Select Customer (Optional)"
            data={[]}
            form={form}
            validateName="userId"
          />
          <InputField
            label={"Name"}
            placeholder={"Enter Customer name"}
            form={form}
            withAsterisk
            validateName={"name"}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter Customer email"}
            form={form}
            withAsterisk
            validateName={"email"}
          />
          <InputField
            label={"Phone Number"}
            placeholder={"Enter Customer Phone Number"}
            form={form}
            withAsterisk
            validateName={"phone"}
          />
        </SimpleGrid>
        <Divider label="Customer Address" labelPosition="center" />
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 1 },
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 4 },
          ]}
        >
          <SelectMenu
            placeholder="Province"
            label="Province"
            data={[
              "Azad Kashmir",
              "Balochistan",
              "FATA",
              "Gilgit Baltistan",
              "Isalamabad",
              "KPK",
              "Punjab",
              "Sindh",
            ]}
            form={form}
            withAsterisk
          />
          <InputField
            label={"City"}
            placeholder={"Enter City"}
            form={form}
            withAsterisk
            validateName={"city"}
          />
          <InputField
            label={"Address"}
            placeholder={"Enter Address"}
            form={form}
            withAsterisk
            validateName={"address"}
          />
          <InputField
            label={"Postal Code"}
            placeholder={"Enter Postal Code"}
            form={form}
            withAsterisk
            validateName={"postalCode"}
          />
        </SimpleGrid>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.orders)}
          />
          <Button
            label={state?.isUpdate ? "Edit Order" : "Add Order"}
            type={"submit"}
            loading={handleAddOrder.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
