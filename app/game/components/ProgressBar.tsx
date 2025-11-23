"use client";

interface ProgressBarProps {
  errosAtuais: number;
  errosMaximos: number;
  categoria: "fruta" | "animal";
}

export default function ProgressBar({ errosAtuais, errosMaximos, categoria }: ProgressBarProps) {
  const porcentagem = errosMaximos > 0 ? (errosAtuais / errosMaximos) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto my-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        {/* Badge da categoria */}
        <span className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
          categoria === "fruta" 
            ? "bg-green-600 text-white" 
            : "bg-amber-600 text-white"
        }`}>
          {categoria === "fruta" ? "🍎 FRUTA" : "🐾 ANIMAL"}
        </span>
        
        {/* Erros */}
        <span className="font-medium text-foreground whitespace-nowrap">
          ERROS: {errosAtuais} / {errosMaximos}
        </span>
        
        {/* Porcentagem */}
        <span className="font-medium text-foreground whitespace-nowrap">
          {Math.round(porcentagem)}%
        </span>
      </div>
      {/* Barra de progresso fina */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mt-1.5">
        <div
          className="h-full bg-destructive transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, porcentagem)}%` }}
        />
      </div>
    </div>
  );
}
