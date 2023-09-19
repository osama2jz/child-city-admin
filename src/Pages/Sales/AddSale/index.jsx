import { Container, Group, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import TextArea from "../../../components/TextArea";
import MultiSelect from "../../../components/MultiSelect";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { showNotification } from "@mantine/notifications";

export const AddSale = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();
  const [subCategories, setSubCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      sale: "",
      description: "",
      category: "",
      subCategory: [],
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter Sale title",
      sale: (value) => (value > 0 ? null : "Please enter sale percent"),
      category: (value) =>
        value?.length > 0 ? null : "Please select sale category",
      description: (value) =>
        value?.length > 0 ? null : "Please enter Sale description",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue(
        "category",
        state.data.category.map((obj) => obj._id.toString())
      );
    }
  }, [state]);
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
  const handleAddSale = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/sale/${state?.data?._id}`}`,
          values
          // {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
          //   },
          // }
        );
      else
        return axios.post(`${backendUrl + "/sale"}`, values, {
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
        navigate(routeNames.general.viewSales);
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
  useEffect(() => {
    queryClient.invalidateQueries("fetchSubCategories");
  }, [form.values.category]);
  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Sale" : "Add Sale"} />
      <form onSubmit={form.onSubmit((values) => handleAddSale.mutate(values))}>
        <InputField
          label={"Title"}
          placeholder={"Enter Sale Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <MultiSelect
          label="Select Category"
          placeholder="Select Categories"
          withAsterisk
          data={categories}
          form={form}
          validateName="category"
        />
        <MultiSelect
          label="Select Sub Category"
          placeholder="Select Sub Categories"
          nothingFound="No Sub Category in select category"
          data={subCategories}
          form={form}
          validateName="subCategory"
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
        {/* <Switch
          label="Default Activation Status"
          defaultChecked={!form.values.blocked}
          {...form.getInputProps("blocked")}
          labelPosition="left"
        /> */}
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewSales)}
          />
          <Button
            label={state?.isUpdate ? "Edit Sale" : "Add Sale"}
            type={"submit"}
            loading={handleAddSale.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
