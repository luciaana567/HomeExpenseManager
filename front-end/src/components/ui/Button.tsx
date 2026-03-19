import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-slate-900 py-2.5 text-white font-medium transition hover:opacity-95 disabled:opacity-70"
    >
      {children}
    </button>
  );
}