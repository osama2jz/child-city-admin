import { createStyles, Select } from "@mantine/core";
import React from "react";
const SelectMenu = (
  {
    value,
    placeholder,
    leftIcon,
    searchable,
    required,
    label,
    pb="sm",
    data,
    clearable,
    withAsterisk,
    onChange,
    creatable,
    form,
    size = "md",
    validateName,
    width,
    borderRadius = "7px",
    my,
    borderWhite,
    customIcon,
    flex,
    disabled,
    display,
    ...props
  },
  ref
) => {
  const useStyles = createStyles((theme) => ({
    //   root: {
    //    width: width,
    //   },

    root: {
      flex: flex,
    },
    input: {
      backgroundColor: "transparent",
      border: borderWhite
        ? "1px solid rgb(255, 255, 255, 0.4)"
        : "1px solid rgb(0, 0, 0, 0.1)",
      borderRadius: borderRadius,
      // width:'110%'
    },
    label: {
      fontSize: "16px",
    },
    rightSection: {
      width: "30px",
    },
    icon: {
      "&:hover": {},
    },
  }));
  const { classes, cx } = useStyles();
  return (
    <Select
      ref={ref}
      my={my}
      w={width}
      zIndex={1000}
      display={display}
      disabled={disabled}
      required={required}
      searchable={searchable}
      withAsterisk={withAsterisk}
      label={label}
      pb={pb}
      size={size}
      getCreateLabel={(query) => `+ Create ${query}`}
      creatable={creatable}
      clearable={clearable}
      onChange={onChange}
      data={data}
      icon={
        customIcon ? (
          customIcon
        ) : leftIcon ? (
          <img src={require(`../../assets/${leftIcon}.svg`)} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{
        input: classes.input,
        visibilityToggle: classes.icon,
        label: classes.label,
        rightSection: classes.rightSection,
      }}
      styles={{
        root: {
          flex: flex,
        },
      }}
      placeholder={placeholder}
      value={value}
      {...form?.getInputProps(validateName)}
      {...props}
    />
  );
};
export default React.forwardRef(SelectMenu);
