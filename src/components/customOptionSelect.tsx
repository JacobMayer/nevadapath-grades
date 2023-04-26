import { OptionProps, components } from "react-select";
import styles from "../styles/Home.module.css";

const CustomOption = ({ children, ...props }: OptionProps<any, boolean>) => {
  // eslint-disable-next-line no-unused-vars
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;
  const { ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <components.Option {...newProps} className={styles["custom-option"]}>
      {children}
    </components.Option>
  );
};

export default CustomOption;
