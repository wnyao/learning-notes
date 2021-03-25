import React from "react";
import { Button as BaseButton } from "baseui/button";
import { ButtonOverrides } from "./Button.style";

export const Button = (props) => {
  const { children } = props;

  return (
    <BaseButton overrides={ButtonOverrides} {...props}>
      {children}
    </BaseButton>
  );
};
