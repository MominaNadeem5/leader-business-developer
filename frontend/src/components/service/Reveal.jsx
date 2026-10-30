import useInView from "../../hooks/useInView";

/* Fades + lifts its children in the first time they scroll into view.
   Adds "is-in" so children can run their own staggered animations. */
export default function Reveal({ as: Tag = "div", children, className = "", ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`svc-reveal ${inView ? "is-in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
