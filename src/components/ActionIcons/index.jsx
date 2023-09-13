import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, PencilOff, Trash, TrashOff } from "tabler-icons-react";
import { routeNames } from "../../Routes/routeNames";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import DeleteModal from "../DeleteModal";
import ViewModal from "../ViewModal";

const ActionIcons = ({ rowData, type, edit, view, del, viewData, blocked }) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  //to view
  const handleView = () => {
    setOpenView(true);
  };

  //to edit
  const handleEdit = () => {
    switch (type) {
      case "Category":
        navigate(routeNames.general.addCategory, {
          state: {
            isUpdate: true,
            data: rowData,
          },
        });
        break;
      case "Product":
        navigate(routeNames.general.addProduct, {
          state: {
            isUpdate: true,
            data: rowData,
          },
        });
        break;
      case "Expenses":
        navigate(routeNames.general.addExpenses, {
          state: {
            isUpdate: true,
            data: rowData,
          },
        });
        break;
      case "Sale":
        navigate(routeNames.general.addSale, {
          state: {
            isUpdate: true,
            data: rowData,
          },
        });
        break;
    }
  };

  //to delete
  const handleDelete = useMutation(
    async () => {
      const link = backendUrl + `/api/v1/${type}/${rowData._id}`;
      return axios.delete(link, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        setOpenDelete(false);
        showNotification({
          title: "success",
          message: `${type} Deleted Successfully`,
          color: "green",
        });
        if (type === "service") queryClient.invalidateQueries("fetchServices");
        else if (type === "project")
          queryClient.invalidateQueries("fetchProjects");
        else if (type === "product")
          queryClient.invalidateQueries("fetchProducts");
        else if (type === "jobs") queryClient.invalidateQueries("fetchJobs");
        else if (type === "teamMember")
          queryClient.invalidateQueries("fetchTeamMembers");
        else if (type === "blog") queryClient.invalidateQueries("fetchBlogs");
        else if (type === "testimonial")
          queryClient.invalidateQueries("fetchTestimonials");
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: res?.data?.message,
          color: "red",
        });
        setOpenDelete(false);
      },
    }
  );

  return (
    <Flex gap={5}>
      {view && (
        <Tooltip label="View">
          <ActionIcon>
            <Eye color={"green"} onClick={handleView} />
          </ActionIcon>
        </Tooltip>
      )}
      {edit && (
        <Tooltip label="Edit">
          <ActionIcon onClick={handleEdit} disabled={blocked}>
            {blocked ? <PencilOff /> : <Pencil color="purple" />}
          </ActionIcon>
        </Tooltip>
      )}
      {del && (
        <Tooltip label="Delete">
          <ActionIcon disabled={blocked}>
            {blocked ? (
              <TrashOff />
            ) : (
              <Trash color={"red"} onClick={() => setOpenDelete(true)} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
      <ViewModal
        opened={openView}
        setOpened={setOpenView}
        title={`View ${type}`}
      >
        {viewData}
      </ViewModal>
      <DeleteModal
        label={`Delete ${type}`}
        message={`Are you sure you want to delete this ${type}. This Action is irreversible.`}
        opened={openDelete}
        onDelete={() => handleDelete.mutate()}
        setOpened={setOpenDelete}
        loading={handleDelete.isLoading}
      />
    </Flex>
  );
};

export default ActionIcons;
