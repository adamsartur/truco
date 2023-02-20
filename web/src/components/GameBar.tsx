import { useEffect, useState } from "react";
import { api } from "../lib/axios";
interface GameBarProps {
  gameBar: PlayerProps[];
}
type PlayerProps = {
  id: string;
  user: string;

  isHand: boolean;
  score: number;

  roundScore: number;
  lastBet: boolean;

  envidoScore: number;
  lastEnvido: boolean;
};
interface GameStateProps {
  round: number;
  bet: number;
  envidoBet: number;
}

export default function GameBar() {
  const [player1, setPlayer1] = useState<PlayerProps>();
  const [player2, setPlayer2] = useState<PlayerProps>();
  const [gameState, setGameState] = useState<GameStateProps>();

  useEffect(() => {
    api.get("score").then((response) => {
      setPlayer1(response.data[0]);
      setPlayer2(response.data[1]);
    });
    api.get("game").then((response) => {
      setGameState(response.data);
    });
  }, []);

  return (
    <div className="fixed left-5 top-5">
      <div>
        Game Score: {player1?.score} - {player2?.score}
      </div>
      <div>
        <div>Round {gameState && gameState.round}</div>
        <div>
          Score: {player1?.roundScore} - {player2?.roundScore}
        </div>
      </div>
    </div>
  );
}
