import { createStyles } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import moment from "moment";

const useStyles = createStyles((theme, { borderWhite }) => ({
  root: {
    backgroundColor: "transparent",
    border: borderWhite
      ? "1px solid rgb(255, 255, 255, 0.2)"
      : "1px solid rgb(0, 0, 0, 0.1)",
    color: borderWhite ? "white !important" : "black !important",
    borderRadius: "5px",
  },
}));

const Datepicker = ({
  placeholder = "Select Date",
  icon,
  label,
  borderWhite,
  size = "md",
  withAsterisk,
  form,
  dropdownType = "popover",
  validateName,
  labelFormat,
  onChange,
  maxDate,
  minDate,
  ...props
}) => {
  const { classes, cx } = useStyles({ borderWhite });
  return (
    <DateInput
      size={size}
      icon={icon}
      maxDate={maxDate}
      minDate={minDate || moment().subtract(100, "years").toDate()}
      // dropdownType={dropdownType}
      placeholder={placeholder}
      label={label}
      withAsterisk={withAsterisk}
      onChange={onChange}
      classNames={{ input: classes.root }}
      {...form?.getInputProps(validateName)}
      // inputFormat={labelFormat}
      {...props}
    />
  );
};
export default Datepicker;
