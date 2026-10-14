import { Link } from "react-router-dom";

export default function Button({ variant = "primary", to, children, ...rest }) {
  const cls = `btn btn--${variant}`;
  return to ? (
    <Link to={to} className={cls} {...rest}>{children}</Link>
  ) : (
    <button className={cls} {...rest}>{children}</button>
  );
}