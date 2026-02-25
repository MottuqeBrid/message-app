import React from "react";
import { Link } from "react-router";

const Logo = ({
  className = "",
  link,
  to,
  text = "MessageApp",
  linkClassName = "",
  ...props
}) => {
  const destination = to || link || "/";

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
          "text-2xl font-bold tracking-tight transition-opacity hover:opacity-90",
          linkClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {text}
      </Link>
    </div>
  );
};

export default Logo;
