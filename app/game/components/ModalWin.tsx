"use client";

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
          <div className="relative">
            {/* Cabeça */}
            <div className="w-16 h-16 bg-pink-300 rounded-full border-2 border-pink-400 relative mx-auto">
              {/* Cabelo */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-yellow-600 rounded-full" />
              {/* Olhos */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 bg-black rounded-full" />
              <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-black rounded-full" />
              {/* Boca feliz */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-5 h-3 border-2 border-pink-500 rounded-b-full" />
            </div>

            {/* Corpo */}
            <div className="w-14 h-20 bg-blue-400 rounded-t-lg mx-auto mt-1 relative">
              {/* Braço esquerdo */}
              <div className="absolute -left-2 top-3 w-4 h-10 bg-pink-300 rounded-full" />
              
              {/* Vestido */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-purple-400 rounded-b-lg z-0" />
              
              {/* Braço direito segurando o pirulito */}
              <div className="absolute -right-6 top-2 w-4 h-12 bg-pink-300 rounded-full transform rotate-12 z-10">
                {/* Pirulito na mão */}
                <div className="absolute -top-8 -right-2 z-20">
                  {/* Palito */}
                  <div className="w-1 h-12 bg-amber-700 mx-auto" />
                  {/* Pirulito */}
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 rounded-full border-4 border-white shadow-lg relative z-30">
                    {/* Espirais decorativas */}
                    <div className="absolute inset-2 border-2 border-white rounded-full opacity-50" />
                    <div className="absolute inset-3 border-2 border-white rounded-full opacity-30" />
                    {/* Brilho */}
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-white rounded-full opacity-60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pernas */}
            <div className="flex gap-2 justify-center mt-1">
              <div className="w-4 h-10 bg-pink-300 rounded-full" />
              <div className="w-4 h-10 bg-pink-300 rounded-full" />
            </div>
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
