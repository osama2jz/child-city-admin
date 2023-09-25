import { Box, Container, Divider, Group, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import SelectMenu from "../../../components/SelectMenu";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Product from "./Product";

export const AddOrder = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    { product: null, selectedSize: null, selectedColor: null, quantity: 1 },
  ]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      userId: null,
      name: "",
      email: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
      paymentMode: "cod",
      status: "pending",
    },

    validate: {
      name: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter customer name",
      email: (value) => (value?.length > 0 ? null : "Please  customer email"),
      phone: (value) => (value?.length > 0 ? null : "Please  customer phone"),
      province: (value) =>
        value?.length > 0 ? null : "Please Select Province",
      city: (value) => (value?.length > 0 ? null : "Please enter city name."),
      address: (value) => (value?.length > 0 ? null : "Please enter address."),
    },
  });
  const now = new Date();

  const handleAddOrder = useMutation(
    (values) => {
      let products = selectedProducts.map((obj, ind) => {
        return {
          product: {
            ...obj.product,
            selectedColor: obj.selectedColor,
            selectedSize: obj.selectedSize,
            selectedQuantity: obj.quantity,
          },
          quantity: obj.quantity,
        };
      });

      const totalPrice = Math.round(
        products.reduce((acc, currentItem) => {
          let itemTotal = 0;
          if (currentItem.product.sale > 0) {
            itemTotal =
              currentItem.quantity *
              (currentItem?.product.price *
                ((100 - currentItem?.product.sale) / 100));
          } else {
            itemTotal = currentItem.quantity * currentItem.product.price;
          }
          return acc + itemTotal;
        }, 0)
      );
      //orderNumber
      const year = now.getFullYear() % 100;
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const randomComponent = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
      let payload = {
        name: values.name,
        email: values.email,
        userId: values.userId,
        phone: values.phone,
        paymentMode: values.paymentMode,
        status: values.status,
        product: products,
        totalPrice: totalPrice,
        orderNo: "CC" + `${year}${month}${day}${randomComponent}`,
        address: {
          province: values.province,
          city: values.city,
          address: values.address,
          postalCode: values.postalCode,
        },
      };
      return axios.post(`${backendUrl + "/order"}`, payload, {});
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        navigate(routeNames.general.orders);
        form.reset();
      },
      onError: (err) => {
        showNotification({
          title: "Error",
          message: "Please fill your order properly.",
          color: "red",
        });
      },
    }
  );

  const { status } = useQuery(
    "fetchProducts",
    () => {
      return axios.get(backendUrl + "/product", {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data
          .map((item) => {
            if (!item.blocked) return { label: item.title, value: item };
          })
          .filter((item) => item !== undefined);
        setProducts(data);
      },
    }
  );

  const { _ } = useQuery(
    "fetchUsers",
    () => {
      return axios.get(backendUrl + "/user", {});
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((item, ind) => {
          return { label: item.name, value: item._id };
        });
        console.log(newData);
        setUsers(newData);
      },
    }
  );
  const handleAddMore = () => {
    setSelectedProducts([
      ...selectedProducts,
      { product: null, selectedSize: null, selectedColor: null, quantity: 1 },
    ]);
  };
  const disableOrder = () => {
    let disable = false;
    selectedProducts.map((obj) => {
      if (obj.product === null) {
        disable = true;
      }
    });
    return disable;
  };
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
            data={users}
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
              "Islamabad",
              "KPK",
              "Punjab",
              "Sindh",
            ]}
            form={form}
            withAsterisk
            validateName="province"
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
            validateName={"postalCode"}
          />
        </SimpleGrid>
        <Divider label="Select Products" labelPosition="center" />
        {selectedProducts.map((obj, ind) => {
          return (
            <Box key={ind}>
              <Product
                products={products}
                selectedProducts={selectedProducts}
                form={form}
                data={obj}
                ind={ind}
                key={ind}
                setData={setSelectedProducts}
                handleAddMore={handleAddMore}
              />
            </Box>
          );
        })}
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.orders)}
          />
          <Button
            label={state?.isUpdate ? "Edit Order" : "Add Order"}
            type={"submit"}
            disabled={selectedProducts.length < 1}
            loading={handleAddOrder.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
