export default function Card({ children, className = "", variant = "default", ...rest }) {
  const baseClasses = "card";
  const variantClasses = `card--${variant}`;
  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
}
