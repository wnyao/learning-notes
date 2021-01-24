import React from "react";
import clsx from "clsx";

export const Input = (props) => {
  const { className, ...rest } = props;

  return (
    <input
      type="text"
      className={clsx("form-control", className)}
      placeholder="Username"
      {...rest}
    />
  );
};
