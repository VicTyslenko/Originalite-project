import type { CSSProperties } from "react";

export type PaymentModalProps = {
  open: boolean;
  close?: () => void;
  text: string;
  actions?: boolean;
  customStyles?: CSSProperties;
  confirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  cancel?: () => void;
};
