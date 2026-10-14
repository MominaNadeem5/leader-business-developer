import { Link } from "react-router-dom";

export default function Button({ variant = "primary", size = "md", to, children, className = "", ...rest }) {
  const baseClasses = "btn";
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  return to ? (
    <Link to={to} className={combinedClasses} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
}
