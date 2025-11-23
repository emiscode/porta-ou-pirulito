"use client";

interface ProgressBarProps {
  errosAtuais: number;
  errosMaximos: number;
}

export default function ProgressBar({ errosAtuais, errosMaximos }: ProgressBarProps) {
  const porcentagem = (errosAtuais / errosMaximos) * 100;

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          Erros: {errosAtuais} / {errosMaximos}
        </span>
        <span className="text-sm font-medium text-foreground">
          {Math.round(porcentagem)}%
        </span>
      </div>
      <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-destructive transition-all duration-300 ease-out"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
}
