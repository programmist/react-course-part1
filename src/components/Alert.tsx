import { ReactNode } from "react";

type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface Props {
  type: AlertType;
  children: ReactNode;
}

function Alert({ type, children }: Props) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
}

export default Alert;
