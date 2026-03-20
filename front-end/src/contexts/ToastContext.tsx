import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Toast from "../components/feedback/Toast";
import { registerToastHandler } from "../lib/toast";

type ToastType = "error" | "success" | "warning" | "info";

type ToastContextData = {
  showToast: (message: string, type?: ToastType) => void;
};

export const ToastContext = createContext({} as ToastContextData);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("error");

const showToast = useCallback((toastMessage: string, toastType: ToastType = "error") => {
  setMessage(toastMessage);
  setType(toastType);
  setIsVisible(true);

  const timeout = window.setTimeout(() => {
    setIsVisible(false);
  }, 4000);

  return () => window.clearTimeout(timeout);
}, []);

  useEffect(() => {
    registerToastHandler(showToast);
  }, [showToast]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <Toast
        message={message}
        isVisible={isVisible}
        type={type}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}