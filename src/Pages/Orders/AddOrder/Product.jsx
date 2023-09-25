import { ActionIcon, Flex, NumberInput, SimpleGrid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SelectMenu from "../../../components/SelectMenu";
import Button from "../../../components/Button";
import { Trash } from "tabler-icons-react";

const Product = ({
  products,
  form,
  data,
  ind,
  setData,
  selectedProducts,
  handleAddMore,
}) => {
  const [newData, setNewData] = useState(data);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const handleChange = (e) => {
    setNewData({ ...newData, product: e });
    let newDataa = selectedProducts;
    newDataa[ind] = newData;
    setData(newDataa);
    setSizes(e.sizes);
    setColors(e.colors);
  };
  const handleColor = (e) => {
    setNewData({ ...newData, selectedColor: e });
    let newDataa = selectedProducts;
    newDataa[ind] = newData;
    setData(newDataa);
  };
  const handleSize = (e) => {
    setNewData({ ...newData, selectedSize: e });
    let newDataa = selectedProducts;
    newDataa[ind] = newData;
    setData(newDataa);
  };
  const handleQuantity = (e) => {
    setNewData({ ...newData, quantity: e });
    let newDataa = selectedProducts;
    newDataa[ind] = newData;
    setData(newDataa);
  };
  const handleRemove = () => {
    let removed = selectedProducts.filter((obj, i) => i !== ind);
    setData(removed);
    console.log(selectedProducts)
  };
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 1 },
        { minWidth: "md", cols: 2 },
        { minWidth: "lg", cols: 4 },
      ]}
    >
      <SelectMenu
        placeholder="Select Product"
        label="Product"
        data={products}
        withAsterisk
        onChange={(e) => handleChange(e)}
      />
      <SelectMenu
        label={"Size"}
        placeholder={"Select Size"}
        data={sizes}
        disabled={!newData.product}
        onChange={(e) => handleSize(e)}
      />
      <SelectMenu
        label={"Color"}
        data={colors}
        placeholder={"Select Color"}
        disabled={!newData.product}
        onChange={(e) => handleColor(e)}
      />
      <Flex gap={5}>
        <NumberInput
          size="md"
          label="Quantity"
          defaultValue={newData.quantity}
          min={1}
          onChange={(e) => handleQuantity(e)}
        />
        {/* <ActionIcon style={{ alignSelf: "center" }} onClick={handleRemove}>
          <Trash />
        </ActionIcon> */}
        {ind === selectedProducts.length - 1 && (
          <Button
            label={"Add More"}
            compact={true}
            onClick={handleAddMore}
            style={{ alignSelf: "center" }}
          />
        )}
      </Flex>
    </SimpleGrid>
  );
};

export default Product;
