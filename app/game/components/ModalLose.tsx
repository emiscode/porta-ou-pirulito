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
            😢 Que Pena!
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-4">
            A porta se fechou completamente!
          </DialogDescription>
          <DialogDescription className="text-center pt-2">
            A palavra era: <strong className="text-primary">{palavra}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onReiniciar} size="lg" className="w-full sm:w-auto">
            Tentar Novamente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
