import React from "react";
import { Checkbox as BaseCheckbox, LABEL_PLACEMENT } from "baseui/checkbox";

export const Checkbox = (props) => {
  const { children } = props;
  return <BaseCheckbox {...props}>{children}</BaseCheckbox>;
};

export { LABEL_PLACEMENT };
