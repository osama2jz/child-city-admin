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
import { useEditor } from "@tiptap/react";
import TextEditor from "../../../components/TextEditor";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Link, RichTextEditor } from "@mantine/tiptap";

export const AddBlog = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: state?.data?.details || "",
  });
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      image: null,
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 200
          ? null
          : "Please enter blog title",
      image: (value) => (value ? null : "Please upload a cover Image"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      console.log(state.data.details);
      editor?.commands.insertContent(state.data.details);
    }
  }, [state]);

  const handleAddBlog = useMutation(
    (values) => {
      values.details = editor?.getHTML();
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
        <TextEditor editor={editor} />
        <Group position="center" mt="lg">
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
