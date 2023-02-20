import { useEffect } from "react";
import { api } from "../lib/axios";
import { Card } from "./Card";

interface HandProps {
  cards?: Array<{
    number: number;
    suit: string;
    id: string;
  }>;
  player: string;
}

export function Hand({ cards, player }: HandProps) {
  return (
    <div className="flex gap-3 justify-center">
      {cards &&
        cards.map((card) => {
          return (
            <Card
              key={card.id}
              number={card.number}
              suit={card.suit}
              id={card.id}
              player={player}
            />
          );
        })}
    </div>
  );
}
