import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import SelectMenu from "../../../components/SelectMenu";

export const AddSubCategory = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      category: "",
      description: "",
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter sub category title",
      category: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please select category",
      description: (value) =>
        value?.length > 0 ? null : "Please enter sub category description",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue("category", state?.data?.category?._id);
    }
  }, [state]);

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

  const handleAddSubCategory = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/sub-category/${state?.data?._id}`}`,
          values
          // {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
          //   },
          // }
        );
      else
        return axios.post(`${backendUrl + "/sub-category"}`, values, {
          // headers: {
          //   authorization: `Bearer ${user.token}`,
          // },
        });
    },
    {
      onSuccess: (response) => {
        if (response?.status == 200) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewSubCategories);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader
        label={state?.isUpdate ? "Edit Sub Category" : "Add Sub Category"}
      />
      <form
        onSubmit={form.onSubmit((values) =>
          handleAddSubCategory.mutate(values)
        )}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Sub Category Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <SelectMenu
          data={categories}
          label="Select Category"
          withAsterisk
          form={form}
          validateName="category"
          placeholder="Select Category"
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"description"}
        />

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewSubCategories)}
          />
          <Button
            label={state?.isUpdate ? "Edit Sub Category" : "Add Sub Category"}
            type={"submit"}
            loading={handleAddSubCategory.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
