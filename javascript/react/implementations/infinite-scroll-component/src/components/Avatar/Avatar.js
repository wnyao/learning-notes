import "./Avatar.style.scss";

export const Avatar = (props) => {
  const { src, alt, width = "200", height = "200" } = props;
  if (!src) return null;
  return (
    <span className="avatar">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="avatar-image"
      />
    </span>
  );
};
