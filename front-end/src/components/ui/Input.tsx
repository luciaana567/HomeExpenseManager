import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
        <label
          htmlFor={id}
          className="sm:w-28 shrink-0 pt-2 text-sm font-medium text-slate-700"
        >
          {label}
        </label>

        <div className="flex-1">
          <input
            id={id}
            {...props}
            className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-2 ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500 focus:ring-slate-200"
            }`}
          />

          {error && (
            <span className="mt-1 block text-sm text-red-600">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}