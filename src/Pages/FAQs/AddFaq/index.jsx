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

export const AddFaq = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      question: "",
      answer: "",
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter FAQ title",
      question: (value) => (value?.length > 0 ? null : "Please enter question"),
      answer: (value) => (value?.length > 0 ? null : "Please enter answer"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);

  const handleAddFaq = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.put(
          `${backendUrl + `/faq/${state?.data?._id}`}`,
          values
          // {
          //   headers: {
          //     authorization: `Bearer ${user.token}`,
          //   },
          // }
        );
      else
        return axios.post(`${backendUrl + "/faq"}`, values, {
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
        navigate(routeNames.general.viewFaq);
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
      <PageHeader label={state?.isUpdate ? "Edit FAQ" : "Add FAQ"} />
      <form onSubmit={form.onSubmit((values) => handleAddFaq.mutate(values))}>
        <InputField
          label={"Title"}
          placeholder={"Enter FAQ Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <InputField
          label={"Question"}
          placeholder={"Enter Question"}
          form={form}
          withAsterisk
          validateName={"question"}
        />
        <TextArea
          label={"Answer"}
          placeholder={"Enter Answer"}
          rows="5"
          form={form}
          withAsterisk
          validateName={"answer"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewFaq)}
          />
          <Button
            label={state?.isUpdate ? "Edit FAQ" : "Add FAQ"}
            type={"submit"}
            loading={handleAddFaq.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
