import axios from "axios";
import { Container, Group } from "@mantine/core";
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

export const AddBlog = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      details: "",
      image: null,
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 200
          ? null
          : "Please enter blog title",
      details: (value) =>
        value?.length > 0 ? null : "Please enter blog details",
      image: (value) => (value ? null : "Please upload a cover Image"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);

  const handleAddBlog = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/blog/${state?.data?._id}`}`,
          values
          // {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
          //   },
          // }
        );
      else
        return axios.post(`${backendUrl + "/blog"}`, values, {
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
        navigate(routeNames.general.viewBlog);
        form.reset();
      },
      onError: (err, res) => {
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
      <PageHeader label={state?.isUpdate ? "Edit Blog" : "Add Blog"} />
      <form onSubmit={form.onSubmit((values) => handleAddBlog.mutate(values))}>
        <InputField
          label={"Title"}
          placeholder={"Enter Blog Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />

        <TextArea
          label={"Blog details"}
          placeholder={"Enter Blog details"}
          rows="5"
          form={form}
          withAsterisk
          validateName={"details"}
        />
        <Group position="center">
          <DropZone
            form={form}
            folderName={"blog"}
            name={"image"}
            label="Cover Image"
          />
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewBlog)}
          />
          <Button
            label={state?.isUpdate ? "Edit Blog" : "Add Blog"}
            type={"submit"}
            loading={handleAddBlog.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
