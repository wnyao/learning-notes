import clsx from "clsx";

export const Button = (props) => {
  const { children, className = "btn-primary", ...rest } = props;
  return (
    <button type="button" className={clsx("btn", className)} {...rest}>
      {children}
    </button>
  );
};
