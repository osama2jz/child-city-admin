import { Button as ButtonMantine, useMantineTheme } from "@mantine/core";

const Button = ({
  leftIcon,
  label,
  styles,
  onClick,
  w,
  compact,
  loading,
  type,
  iconWidth = "16px",
  disabled,
  size = "md",
  variant,
  ...props
}) => {
  const theme = useMantineTheme();
  return (
    <ButtonMantine
      sx={styles}
      compact={compact}
      disabled={disabled}
      loading={loading}
      w={w}
      // bg={color === "pink" ? "#ff8087" : theme.colors.primary}
      size={size}
      radius={"xl"}
      variant={variant}
      color="primary.0"
      
      leftIcon={
        leftIcon ? (
          <img
            src={new URL(`../../assets/${leftIcon}.svg`, import.meta.url).href}
            alt="icon"
            width={iconWidth}
          />
        ) : (
          ""
        )
      }
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
    </ButtonMantine>
  );
};
export default Button;
