import "./styles/global.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import GameBar from "./components/GameBar";
import { Table } from "./components/Table";

type GameBarProps = Array<{
  id: string;
  user: string;

  isHand: boolean;
  score: number;

  roundScore: number;
  lastBet: boolean;

  envidoScore: number;
  lastEnvido: boolean;
}>;

type GameStateResponseProps = Array<{
  id: string;
  bet: number;
  round: number;
  CardsPlayed: [];
}>;

type PlayersResponseProps = Array<{
  id: string;
  user: string;
  score: number;
  roundScore: number;
  isHand: boolean;
  lastBet: boolean;
  envidoScore: number;
  lastEnvido: boolean;
  _count: { PlayerCards: number };
}>;

interface PlayerProps {
  id: string;
  user: string;
  score: number;
  roundScore: number;
  isHand: boolean;
  lastBet: boolean;
  envidoScore: number;
  lastEnvido: boolean;
  _count: { PlayerCards: number };
}

export function App() {
  const [handOne, setHandOne] = useState([]);
  const [handTwo, setHandTwo] = useState([]);
  const [tableCards, setTableCards] = useState<GameStateResponseProps>([]);
  const [gameBar, setGameBar] = useState<GameBarProps>();
  const [players, setPlayers] = useState<PlayersResponseProps>([]);
  const [isPlaying, setIsPlaying] = useState<string>("");
  const [handPlayer, setHandPlayer] = useState<PlayerProps>();
  const [firstPlayer, setFirstPlayer] = useState<PlayerProps>();

  useEffect(() => {
    api.get("cards1").then((response) => {
      const handPlayer = response.data;
      setHandOne(handPlayer);
    });
    api.get("cards2").then((response) => {
      const secondPlayer = response.data;
      setHandTwo(secondPlayer);
    });
    api.get("table").then((response) => {
      const tableCardsResponse = response.data;
      setTableCards(tableCardsResponse);
    });
    api.get("game").then((response) => {
      const gameStateResponse = response.data;
      console.log(gameStateResponse);
    });
    api.get("players").then((response) => {
      const playersResponse = response.data;
      setPlayers(playersResponse);
      determineCurrentPlaying(playersResponse);
      console.log(playersResponse);
    });

    function determineCurrentPlaying(currentPlayers: PlayersResponseProps) {
      const [handPlayerDetermine] = currentPlayers.filter(
        (currentPlayer) => currentPlayer.isHand
      );
      const [firstPlayerDetermine] = currentPlayers.filter(
        (currentPlayer) => !currentPlayer.isHand
      );
      setHandPlayer(handPlayerDetermine);
      setFirstPlayer(firstPlayerDetermine);

      const playing =
        handPlayer._count.PlayerCards > firstPlayer._count.PlayerCards
          ? handPlayer.id
          : firstPlayer.id;

      setIsPlaying(playing);
      console.log(playing);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full max-w-5xl px-6 flex flex-col justify-between">
        <Header cards={handOne} player="15e3b151-6167-4db1-8279-e9599fac6e9f" />
        {/*Player 1 */}
        <Table cards={tableCards} />
        <Footer cards={handTwo} player="7538aa0c-767c-4177-b35e-6d2d3f80cc5d" />
        {/*Player 2 */}
      </div>
      <GameBar />
    </div>
  );
}
