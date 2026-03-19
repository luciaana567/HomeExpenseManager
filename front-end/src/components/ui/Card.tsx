type CardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}