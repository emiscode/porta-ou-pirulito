"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalWinProps {
  aberto: boolean;
  palavra: string;
  onReiniciar: () => void;
}

export default function ModalWin({ aberto, palavra, onReiniciar }: ModalWinProps) {
  return (
    <Dialog open={aberto}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-green-600">
            🎉 PARABÉNS! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-4">
            VOCÊ ACERTOU A PALAVRA: <strong className="text-primary">{palavra.toUpperCase()}</strong>
          </DialogDescription>
          <DialogDescription className="text-center pt-2">
            A MENINA CONSEGUIU ATRAVESSAR A PORTA E PEGAR O PIRULITO!
          </DialogDescription>
        </DialogHeader>
        
        {/* Menina com pirulito na mão */}
        <div className="flex justify-center items-center py-6">
          <div className="relative w-32 h-40 md:w-40 md:h-48">
            <Image
              src="/images/girl.jpg"
              alt="Menina feliz"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onReiniciar} size="lg" className="w-full sm:w-auto">
            JOGAR NOVAMENTE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
