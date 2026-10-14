export default function Icon({ children, size = "md", variant = "default", className = "", ...rest }) {
  const baseClasses = "icon";
  const sizeClasses = `icon--${size}`;
  const variantClasses = `icon--${variant}`;
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  return (
    <span className={combinedClasses} {...rest}>
      {children}
    </span>
  );
}
