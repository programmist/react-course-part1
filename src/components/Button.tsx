import { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface Props {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick: () => void;
}
function Button({ variant = "primary", children, onClick }: Props) {
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
