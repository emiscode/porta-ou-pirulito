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

interface ModalLoseProps {
  aberto: boolean;
  palavra: string;
  onReiniciar: () => void;
}

export default function ModalLose({ aberto, palavra, onReiniciar }: ModalLoseProps) {
  return (
    <Dialog open={aberto}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-red-600">
            😢 QUE PENA!
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-2">
            A PORTA SE FECHOU!
          </DialogDescription>
          <DialogDescription className="text-center">
            A PALAVRA ERA: 
          </DialogDescription>
          <DialogDescription className="text-center pt-2">
          <strong className="text-primary text-2xl">{palavra.toUpperCase()}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onReiniciar} size="lg" className="w-full sm:w-auto">
            TENTAR NOVAMENTE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
