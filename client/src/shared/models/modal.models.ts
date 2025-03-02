export interface ModalProps {
  open: boolean;
  close: () => void;
  text: string;
  actions: any;
  customStyles: any;
  confirm: () => void;
  confirmText: string;
  cancelText: any;
}
