import BootstrapVariant from "@/types/BootstrapVariant";
import { ReactNode } from "react";

interface Props {
  type: BootstrapVariant;
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
