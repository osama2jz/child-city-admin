import { Container, Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import MultiSelect from "../../../components/MultiSelect";
import MultipleDropzone from "../../../components/MultipleDropzone";
import PageHeader from "../../../components/PageHeader";
import SelectMenu from "../../../components/SelectMenu";
import TextArea from "../../../components/TextArea";
import { backendUrl, colors } from "../../../constants/constants";
import { uploadMultipleImages } from "../../../constants/firebase";
import { UserContext } from "../../../contexts/UserContext";

export const AddProduct = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let { state } = useLocation();
  const [colorss, setColors] = useState(colors);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      category: null,
      subCategory: null,
      colors: [],
      sizes: [],
      price: "",
      actualPrice: "",
      sale: "",
      quantity: 0,
      sku: "",
      description: "",
      images: [],
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 200
          ? null
          : "Please enter product title (upto 200 characters)",
      category: (value) =>
        value?.length > 0 ? null : "Please select product category",
      price: (value) =>
        value > 0 && value < 10000
          ? null
          : "Please enter product price (0 to 10000)",
      actualPrice: (value) =>
        value > 0 && value < 10000 ? null : "Please enter actual price",
      quantity: (value) =>
        value >= 0 && value < 10000
          ? null
          : "Please select product quantity (0 to 10000)",
      description: (value) =>
        value?.length > 0 ? null : "Please enter product description",
      images: (value) =>
        value.length > 0 ? null : "Please upload product image",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue("category", state?.data?.category?._id);
      form.setFieldValue("subCategory", state?.data?.subCategory?._id);
    }
  }, [state]);

  useEffect(() => {
    queryClient.invalidateQueries("fetchSubCategories");
  }, [form.values.category]);
  
  const handleAddProduct = useMutation(
    async (values) => {
      const urls = await uploadMultipleImages(values.images, "Products");
      values.images = urls;
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/product/${state?.data?._id}`}`,
          values
        );
      else {
        return axios.post(`${backendUrl + "/product"}`, values, {});
      }
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        navigate(routeNames.general.viewProducts);
        form.reset();
      },
    }
  );

  const { status } = useQuery(
    "fetchCategories",
    () => {
      return axios.get(backendUrl + "/category", {});
    },
    {
      onSuccess: (res) => {
        let cat = res.data.data
          .filter((obj) => !obj?.blocked)
          .map((obj) => {
            if (!obj?.blocked) return { label: obj.title, value: obj?._id };
          });
        setCategories(cat);
      },
    }
  );
  const { _ } = useQuery(
    "fetchSubCategories",
    () => {
      return axios.get(backendUrl + "/sub-category", {});
    },
    {
      onSuccess: (res) => {
        let cat = res.data.data
          .filter((obj) => !obj?.blocked)
          .map((obj) => {
            if (!obj?.blocked && obj.category._id == form?.values?.category)
              return { label: obj.title, value: obj?._id };
          })
          .filter((item) => item !== undefined);
        setSubCategories(cat);
      },
    },
    { enabled: !!form.values.category }
  );
  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Product" : "Add Product"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddProduct.mutate(values))}
      >
        <Grid>
          <Grid.Col sm={12}>
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
              data={categories}
              label="Select Category"
              withAsterisk
              form={form}
              validateName="category"
              placeholder="Select Category"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              data={subCategories}
              label="Select Sub Category"
              form={form}
              nothingFound="No Sub Category in select category"
              disabled={!form.values.category}
              validateName="subCategory"
              placeholder="Select Sub Category"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <MultiSelect
              data={colorss}
              label="Select or Type Colors"
              placeholder="Select Colors"
              form={form}
              creatable={true}
              searchable={true}
              validateName="colors"
              getCreateLabel={(query) => ` ${query}`}
              onCreate={(query) => {
                const item = query;
                setColors((current) => [...current, item]);
                return item;
              }}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <MultiSelect
              data={["3-6M", "6-9M", "1-2Y", "2-3Y", "3-4Y"]}
              label="Select Sizes"
              placeholder="Select Sizes"
              form={form}
              validateName="sizes"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label={"Actual Price"}
              placeholder={"Enter Actua Price"}
              type="number"
              withAsterisk
              form={form}
              validateName="actualPrice"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label={"Price"}
              placeholder={"Enter Product Price"}
              withAsterisk
              type="number"
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
            loading={handleAddProduct.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
