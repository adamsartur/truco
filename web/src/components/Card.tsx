import { Heart, Spade, Club, Diamond } from "phosphor-react";
import { api } from "../lib/axios";

interface CardProps {
  number: number;
  suit: string;
  id: string;
  player: string;
}

export function Card({ number, suit, id, player }: CardProps) {
  async function handlePlayCard(cardId: string) {
    await api.patch(`/play/${cardId}/${player}`);
  }

  return (
    <div
      onClick={() => {
        handlePlayCard(id);
      }}
      className="border-white border-solid w-36 h-48 rounded-lg border-4 p-2 flex bg-white items-start text-black relative "
    >
      <div className="w-full flex items-center align-middle">
        {number}
        {suit === "D" && <Diamond className="text-sm font-bold text-red-600" />}
        {suit === "H" && <Heart className="text-sm font-bold text-red-600" />}
        {suit === "S" && <Spade className="text-sm font-bold" />}
        {suit === "C" && <Club className="text-sm font-bold" />}
      </div>
      <div className="absolute w-full h-full flex items-center justify-center -mt-2 -ml-2">
        {suit === "D" && (
          <Diamond className="text-7xl font-bold text-red-600" />
        )}
        {suit === "H" && <Heart className="text-7xl font-bold text-red-600" />}
        {suit === "S" && <Spade className="text-7xl font-bold" />}
        {suit === "C" && <Club className="text-7xl font-bold" />}
      </div>
    </div>
  );
}
