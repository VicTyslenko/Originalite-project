import { type Props } from "./models";

export const DefaultTypography = ({ as, children, ...props }: Props) => {
  const Component = as ?? "p";

  return (
    <Component className="default-typography" {...props}>
      {children}
    </Component>
  );
};
