import * as React from "react";
import { FormControl as BaseFormControl } from "baseui/form-control";

const FormControlOverrides = {
  Label: {
    style: ({ $theme }) => {
      return {
        fontWeight: "bold",
      };
    },
  },
  Caption: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.secondary,
      };
    },
  },
  ControlContainer: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.primary,
      };
    },
  },
};

export const FormControl = (props) => {
  const { children } = props;

  return (
    <BaseFormControl overrides={FormControlOverrides} {...props}>
      {children}
    </BaseFormControl>
  );
};
