import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  variant?: "black" | "beige" | "brown";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  loadingText?: string;
}

export default function Button({
  type = "button",
  children,
  className,
  variant = "black",
  disabled = false,
  isLoading = false,
  loadingText = "Sender...",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "group relative flex w-full h-12 lg:h-[57px] p-[5px] items-center justify-center overflow-hidden outline-none rounded-full border text-[12px] lg:text-[14px] font-normal leading-[120%] uppercase enabled:cursor-pointer disabled:opacity-60 enabled:active:scale-[98%] will-change-transform transition-[color,transform] duration-300 ease-in-out before:content-[''] before:absolute before:z-0 before:top-0 before:left-0 before:h-full before:w-0 before:rounded-full before:transition-[width] before:duration-700 before:ease-in-out enabled:focus-visible:before:w-full xl:enabled:hover:before:w-full",
        variant === "black"
          ? "border-black bg-black text-white before:bg-white enabled:focus-visible:text-black xl:enabled:hover:text-black"
          : variant === "beige"
            ? "border-beige bg-beige text-black before:bg-black enabled:focus-visible:text-beige xl:enabled:hover:text-beige"
            : "border-brown bg-brown text-white before:bg-beige enabled:focus-visible:text-black xl:enabled:hover:text-black",
        className,
      )}
    >
      <span className="relative z-10">{isLoading ? loadingText : children}</span>
    </button>
  );
}
