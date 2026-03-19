type ToastType = "error" | "success" | "warning" | "info";

type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: ToastType;
};

const toastStyles = {
  error: {
    container: "border-red-200 bg-red-50",
    title: "text-red-700",
    message: "text-red-600",
  },
  success: {
    container: "border-green-200 bg-green-50",
    title: "text-green-700",
    message: "text-green-600",
  },
  warning: {
    container: "border-yellow-200 bg-yellow-50",
    title: "text-yellow-700",
    message: "text-yellow-600",
  },
  info: {
    container: "border-sky-200 bg-sky-50",
    title: "text-sky-700",
    message: "text-sky-600",
  },
};

export default function Toast({
  message,
  isVisible,
  onClose,
  type = "error",
}: ToastProps) {
  if (!isVisible || !message) return null;

  const style = toastStyles[type];

  return (
    <div className="fixed top-5 right-5 z-50 w-full max-w-sm px-4">
      <div
        className={`rounded-xl border shadow-lg ${style.container} animate-[fadeIn_.2s_ease-in-out]`}
      >
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <p className={`text-sm font-semibold ${style.title}`}>
              {type === "error" && "Erro"}
              {type === "success" && "Sucesso"}
              {type === "warning" && "Atenção"}
              {type === "info" && "Informação"}
            </p>

            <p className={`mt-1 text-sm ${style.message}`}>{message}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-slate-400 transition hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}