import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
