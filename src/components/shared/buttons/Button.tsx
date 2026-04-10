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
        "group flex w-full h-12 lg:h-[57px] p-[5px] items-center justify-center overflow-hidden outline-none rounded-full text-[12px] lg:text-[14px] font-normal leading-[120%] uppercase enabled:cursor-pointer disabled:opacity-60 enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out enabled:focus-visible:brightness-125 xl:enabled:hover:brightness-125",
        variant === "black"
          ? "bg-black text-white"
          : variant === "beige"
            ? "bg-beige text-black"
            : "bg-brown text-white",
        className,
      )}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
