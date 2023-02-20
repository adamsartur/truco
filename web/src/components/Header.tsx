import { Hand } from "./Hand";

interface HeaderProps {
  cards: Array<{
    number: number;
    suit: string;
    id: string;
  }>;
  player: string;
}
export default function Header({ cards, player }: HeaderProps) {
  return (
    <div className="header items-start">
      <Hand cards={cards} player={player} />
    </div>
  );
}
