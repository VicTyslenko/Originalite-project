import type { CSSProperties, ReactNode } from "react";

export type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
