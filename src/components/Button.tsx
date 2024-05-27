import BootstrapVariant from "@/types/BootstrapVariant";
import { ReactNode } from "react";

interface Props {
  variant?: BootstrapVariant;
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
