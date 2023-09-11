import { createStyles, PasswordInput } from "@mantine/core";

const PassInput = ({
  placeholder,
  leftIcon,
  label,
  required,
  pb,
  width,
  form,
  size = "md",
  validateName,
  backgroundColor = "transparent",
}) => {
  const useStyles = createStyles((theme) => ({
    input: {
      backgroundColor: backgroundColor,
      color: "red",
      border: "1px solid rgb(0, 0, 0, 0.1)",
    },
  }));
  const { classes, cx } = useStyles();
  return (
    <PasswordInput
      w={width}
      pb={pb}
      size={size}
      withAsterisk={required ? true : false}
      label={label}
      {...form?.getInputProps(validateName)}
      icon={
        leftIcon ? (
          <img src={require(`../../assets/${leftIcon}.svg`)} alt="icon" />
        ) : (
          ""
        )
      }
      classNames={{ input: classes.input }}
      placeholder={placeholder}
    />
  );
};
export default PassInput;
