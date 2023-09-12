import axios from "axios";
import { Container, Grid, Group, SimpleGrid } from "@mantine/core";
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
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import SelectMenu from "../../../components/SelectMenu";
import MultiSelect from "../../../components/MultiSelect";
import MultipleDropzone from "../../../components/MultipleDropzone";

export const AddProduct = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      category: "",
      season: "",
      colors: "",
      sizes: "",
      price: "",
      quantity: 0,
      sku: "",
      description: "",
      images: [],
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter product title",
      category: (value) =>
        value?.length > 0 ? null : "Please select product category",
      price: (value) =>
        value?.length > 0 ? null : "Please enter product price",
      quantity: (value) =>
        value?.length > 0 && value >= 0
          ? null
          : "Please select product quantity",
      sku: (value) => (value?.length > 0 ? null : "Please select product sku"),
      description: (value) =>
        value?.length > 0 ? null : "Please enter product description",
      images: (value) =>
        value.length > 0 ? null : "Please upload product image",
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
      <PageHeader label={state?.isUpdate ? "Edit Product" : "Add Product"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <Grid>
          <Grid.Col sm={6}>
            <InputField
              label={"Title"}
              placeholder={"Enter Product Title"}
              form={form}
              withAsterisk
              validateName={"title"}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              data={["Boys", "Girls"]}
              label="Select Category"
              withAsterisk
              form={form}
              validateName="category"
              placeholder="Select Category"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              data={["Winters Collections", "Summers Collection"]}
              label="Select Season"
              placeholder="Select Season"
              form={form}
              validateName="season"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <MultiSelect
              data={["Red", "Yellow", "Blue", "Black", "Purple", "Pink"]}
              label="Select Colors"
              placeholder="Select Colors"
              form={form}
              validateName="colors"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <MultiSelect
              data={["3-6M", "6-9M", "1-2Y", "2-3Y", "3-4y"]}
              label="Select Sizes"
              placeholder="Select Sizes"
              form={form}
              validateName="sizes"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label={"Price"}
              placeholder={"Enter Product Price"}
              withAsterisk
              form={form}
              validateName="price"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label={"Quantity"}
              placeholder={"Enter Product Quantity"}
              type="number"
              withAsterisk
              form={form}
              validateName="quantity"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label={"SKU"}
              placeholder={"Enter Product SKU"}
              withAsterisk
              form={form}
              validateName="sku"
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <TextArea
              label={"Description"}
              placeholder={"Enter Product Description"}
              rows="4"
              form={form}
              withAsterisk
              validateName={"description"}
            />
          </Grid.Col>
        </Grid>
        <MultipleDropzone
          form={form}
          fieldName={"images"}
          type={"image"}
          maxFiles={10}
          subText={"Upload Product Images"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewProducts)}
          />
          <Button
            label={state?.isUpdate ? "Edit Product" : "Add Product"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
