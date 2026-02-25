import { Link } from "react-router";

const Logo = ({
  className = "",
  link,
  to,
  text = "MessageApp",
  logoSrc = "/logo.png",
  logoAlt,
  showText = false,
  linkClassName = "",
  imageClassName = "",
  ...props
}) => {
  const destination = to || link || "/";
  const accessibleAlt = logoAlt || `${text} logo`;

  return (
    <div
      className={["inline-flex items-center", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Link
        to={destination}
        aria-label={`${text} home`}
        className={[
          "inline-flex items-center gap-2 font-bold tracking-tight transition-opacity hover:opacity-90",
          linkClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img
          src={logoSrc}
          alt={accessibleAlt}
          className={["h-10 w-auto object-contain", imageClassName]
            .filter(Boolean)
            .join(" ")}
        />
        {showText && <span className="hidden sm:inline text-xl">{text}</span>}
      </Link>
    </div>
  );
};

export default Logo;
