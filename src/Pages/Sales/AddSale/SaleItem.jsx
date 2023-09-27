import { ActionIcon, Grid, Switch } from "@mantine/core";
import React, { useEffect, useState } from "react";
import MultiSelect from "../../../components/MultiSelect";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { backendUrl } from "../../../constants/constants";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Trash } from "tabler-icons-react";
import SelectMenu from "../../../components/SelectMenu";
import { showNotification } from "@mantine/notifications";

const SaleItem = ({ data, setData, ind, sales, setDisableButton }) => {
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();
  const [subCategories, setSubCategories] = useState([]);
  const [toggle, setToggle] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      sale: 0,
      category: "",
      subCategory: [],
      blocked: false,
    },

    validate: {
      sale: (value) =>
        value > 0 && value <= 100 ? null : "Please enter sale percent",
      category: (value) =>
        value?.length > 0 ? null : "Please select sale category",
    },
  });
  useEffect(() => {
    setToggle(!data?.blocked);
  }, []);
  console.log(form.values.blocked);
  useEffect(() => {
    form.setValues(data);
    form.setFieldValue("category", data.category?._id);
  }, []);

  useEffect(() => {
    if (Object.keys(form.errors).length == 0) {
      sales[ind] = form.values;
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [form.values]);

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

  useEffect(() => {
    form.setValues("subCategory", []);
    queryClient.invalidateQueries("fetchSubCategories");
  }, [form.values.category]);

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

  const handleDelete = useMutation(
    async () => {
      const link = backendUrl + `/sale/${data._id}`;
      return axios.delete(link, {});
    },
    {
      onSuccess: (res) => {
        showNotification({
          title: "success",
          message: `Sale Deleted Successfully`,
          color: "green",
        });
        queryClient.invalidateQueries("fetchSales");
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: res?.data?.message,
          color: "red",
        });
      },
    }
  );

  return (
    <form onSubmit={form.onSubmit((values) => handleAddSale.mutate(values))}>
      <Grid>
        <Grid.Col sm={6} lg={4}>
          <SelectMenu
            label="Select Category"
            placeholder="Select Category"
            withAsterisk
            data={categories}
            form={form}
            validateName="category"
          />
        </Grid.Col>
        <Grid.Col sm={6} lg={4}>
          <MultiSelect
            label="Select Sub Category"
            placeholder="Select Sub Categories"
            nothingFound="No Sub Category in select category"
            data={subCategories}
            disabled={!form.values.category}
            form={form}
            validateName="subCategory"
          />
        </Grid.Col>
        <Grid.Col sm={6} lg={2}>
          <InputField
            label={"Amount (%)"}
            placeholder={"Amount (%)"}
            form={form}
            withAsterisk
            type="number"
            validateName={"sale"}
          />
        </Grid.Col>
        <Grid.Col
          sm={6}
          md={2}
          mt="sm"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Switch
            checked={toggle}
            onChange={(event) => {
              form.setFieldValue("blocked", !event.currentTarget.checked);
              setToggle(event.currentTarget.checked);
            }}
          />
          <ActionIcon ml="sm" color="red">
            <Trash onClick={() => handleDelete.mutate()} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default SaleItem;
