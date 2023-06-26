import { MouseEventHandler } from "react";

export default function Button({
  children,
  classes,
  disabled,
  type,
  onClick,
}: {
  children: React.ReactNode;
  classes?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-6 flex items-center text-sm bg-[#eeeeee] hover:bg-[#e8e8e8] transition-all duration-150 ease-in-out py-3 rounded-md ${classes}`}
    >
      {children}
    </button>
  );
}
