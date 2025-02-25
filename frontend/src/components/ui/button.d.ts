declare module "@/components/ui/button" {
  import { FC, ButtonHTMLAttributes } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Add any additional props here
  }

  const Button: FC<ButtonProps>;
  export default Button;
}
