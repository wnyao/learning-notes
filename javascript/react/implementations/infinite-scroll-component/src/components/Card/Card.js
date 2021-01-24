import clsx from "clsx";

export const Card = (props) => {
  const { src, alt, title, description, children, className, ...rest } = props;

  return (
    <div className={clsx("card my-4", className)} {...rest}>
      {src && <img className="card-img-top" src={src} alt={alt} />}
      <div className="card-body p-4">
        {title && <h5 className="card-title">{title}</h5>}
        {description && <p className="card-text my-2">{description}</p>}
        {children}
      </div>
    </div>
  );
};
