import { Hand } from "./Hand";

interface FooterProps {
  cards: Array<{
    number: number;
    suit: string;
    id: string;
  }>;
  player: string;
}

export default function Footer({ cards, player }: FooterProps) {
  return (
    <div className="footer items-end">
      <Hand cards={cards} player={player} />
    </div>
  );
}
