export default function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>

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
          <span className="text-sm text-red-600">{error}</span>
        )}
      </div>
    </div>
  );
}