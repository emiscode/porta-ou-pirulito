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
            🎉 Parabéns! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-4">
            Você acertou a palavra: <strong className="text-primary">{palavra}</strong>
          </DialogDescription>
          <DialogDescription className="text-center pt-2">
            A menina conseguiu atravessar a porta e pegar o pirulito!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onReiniciar} size="lg" className="w-full sm:w-auto">
            Jogar Novamente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
