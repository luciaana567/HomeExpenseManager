type CardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  localItens?: "left" | "center" | "right";
};

export default function MediumCard({
  title,
  subtitle,
  children,
  localItens = "center",
}: CardProps) {
  const titleAlignment =
    localItens === "left"
      ? "text-left"
      : localItens === "right"
        ? "text-right"
        : "text-center";

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
      <div className={`mb-6 ${titleAlignment}`}>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      <div className="text-left">
        {children}
      </div>
    </div>
  );
}