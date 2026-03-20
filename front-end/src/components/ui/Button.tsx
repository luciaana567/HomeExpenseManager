type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export default function Button({
  children,
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={`
        rounded-xl bg-slate-800 text-white transition hover:bg-slate-700
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}


