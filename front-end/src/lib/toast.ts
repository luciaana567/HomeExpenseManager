type ToastType = "error" | "success" | "warning" | "info";

type ShowToastFn = (message: string, type?: ToastType) => void;

let toastHandler: ShowToastFn | null = null;

export function registerToastHandler(handler: ShowToastFn) {
  toastHandler = handler;
}

export function showGlobalToast(message: string, type: ToastType = "error") {
  if (toastHandler) {
    toastHandler(message, type);
  }
}
