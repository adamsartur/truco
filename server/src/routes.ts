import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  type PlayersProps = Array<{
    id: string;
    score: number;
    roundScore: number;
    isHand: boolean;
    lastBet: boolean;
    lastEnvido: boolean;
    envidoScore: number;
    user: string;
  }>;

  type CardsProps = Array<{
    id: string;
    suit: string;
    number: number;
    value: number;
    available: boolean;
  }>;

  app.patch("/new/game", async () => {
    await prisma.playerCards.deleteMany();
    await prisma.gameState.deleteMany();
    await prisma.cards.updateMany({
      data: {
        available: true,
      },
    });
  });

  app.patch("/new/hand", async () => {
    function determineWinner(playersResponse: PlayersProps) {}
    const gameStateProps = z.object({
      bet: z.number(),
      round: z.number(),
    });

    if ((await prisma.gameState.count()) == 0) {
      await prisma.gameState.create({
        data: {
          bet: 0,
          round: 0,
        },
      });
    }
    const gameState = await prisma.gameState.findFirst();
    const { bet, round } = gameStateProps.parse(gameState);

    //sorts so that winning player comes first
    const players: PlayersProps = await prisma.player.findMany({
      orderBy: [{ roundScore: "desc" }, { isHand: "desc" }],
    });

    //If game already started
    if (round > 0) {
      //determine round winner
      console.log(players);
      const winningPlayer = players[0];
      const losingPlayer = players[1];

      console.log(winningPlayer);

      //give round points to winner
      //sets hand for next round
      console.log(`//give ${bet} points to ${winningPlayer.user}`);
      await prisma.player.update({
        data: {
          score: bet + winningPlayer.score,
          isHand: true,
          roundScore: 0,
        },
        where: {
          id: winningPlayer.id,
        },
      });
      await prisma.player.update({
        data: {
          isHand: false,
          roundScore: 0,
        },
        where: {
          id: losingPlayer.id,
        },
      });
    }

    //set environment for new round
    console.log("//set environment for new round");
    await prisma.playerCards.deleteMany();
    await prisma.gameState.updateMany({
      data: {
        round: 0,
      },
    });
    await prisma.cardsPlayed.deleteMany();
    await prisma.cards.updateMany({
      data: {
        available: true,
      },
    });

    //fetch new card hand to the players
    const cardsResponse: CardsProps = await prisma.$queryRaw`
        SELECT * 
        FROM cards
        WHERE cards.available == true
        ORDER BY random()
        LIMIT 6;
    `;

    if (cardsResponse.length > 0) {
      cardsResponse.map(async (card, i) => {
        //gives cards to player
        if (i < 3) {
          await prisma.playerCards.create({
            data: {
              player_id: players[0].id,
              card_id: card.id,
            },
          });
        } else {
          await prisma.playerCards.create({
            data: {
              player_id: players[1].id,
              card_id: card.id,
            },
          });
        }

        //sets cards unavailable in deck
        await prisma.cards.update({
          where: {
            id: card.id,
          },
          data: {
            available: false,
          },
        });
      });
    }
  });

  app.get("/winner", async () => {
    const players: PlayersProps = await prisma.player.findMany({
      orderBy: [
        {
          roundScore: "desc",
        },
        {
          isHand: "desc",
        },
      ],
    });

    return players;
  });

  app.get("/score", async () => {
    const players: PlayersProps = await prisma.player.findMany({
      orderBy: {
        isHand: "desc",
      },
    });

    return players;
  });

  app.get("/game", async () => {
    const game = await prisma.gameState.findFirst({
      include: {
        CardsPlayed: true,
      },
    });

    return game;
  });

  app.patch("/join/:name", async (request) => {
    const joinParams = z.object({
      name: z.string(),
    });
    const { name } = joinParams.parse(request.params);

    console.log(name);

    if ((await prisma.player.count()) < 2) {
      await prisma.player.create({
        data: {
          user: name,
        },
      });
    }
  });

  app.get("/cards/:user", async (req) => {
    const cardsParams = z.object({
      user: z.string(),
    });
    const { user } = cardsParams.parse(req.params);
    const cardsCount = await prisma.playerCards.findMany({
      where: {
        player_id: user,
      },
      select: {
        cards: true,
      },
    });
    const cardsReturn = cardsCount.map((card) => {
      return card.cards;
    });
    return cardsReturn;
  });

  app.get("/cards1", async (req) => {
    const cardsCount = await prisma.playerCards.findMany({
      where: {
        player_id: "15e3b151-6167-4db1-8279-e9599fac6e9f",
      },
      select: {
        cards: true,
      },
    });
    const cardsReturn = cardsCount.map((card) => {
      return card.cards;
    });
    return cardsReturn;
  });

  app.get("/cards2", async (req) => {
    const cardsCount = await prisma.playerCards.findMany({
      where: {
        player_id: "7538aa0c-767c-4177-b35e-6d2d3f80cc5d",
      },
      select: {
        cards: true,
      },
    });
    const cardsReturn = cardsCount.map((card) => {
      return card.cards;
    });
    return cardsReturn;
  });

  app.get("/table", async (req) => {
    const cardsCount = await prisma.cardsPlayed.findMany({
      select: {
        cards: true,
      },
    });
    const cardsReturn = cardsCount.map((card) => {
      return card.cards;
    });
    return cardsReturn;
  });

  app.get("/playing", async (req) => {
    const players = await prisma.player.findMany({
      include: {
        _count: {
          select: {
            PlayerCards: true,
          },
        },
      },
    });
    const gameState = await prisma.gameState.findFirst();

    const [handPlayer] = players.filter((player) => player.isHand);
    const [firstPlayer] = players.filter((player) => !player.isHand);

    if (firstPlayer._count.PlayerCards > handPlayer._count.PlayerCards) {
      return handPlayer.id;
    } else {
      return firstPlayer.id;
    }
  });

  app.get("/players", async (req) => {
    const players = await prisma.player.findMany({
      orderBy: {
        isHand: "desc",
      },
      include: {
        _count: {
          select: {
            PlayerCards: true,
          },
        },
      },
    });

    return players;
  });

  app.patch("/play/:card_id/:user_id", async (req) => {
    const players = await prisma.player.findMany({
      include: {
        _count: {
          select: {
            PlayerCards: true,
          },
        },
      },
    });
    const gameState = await prisma.gameState.findFirst();

    const [handPlayer] = players.filter((player) => player.isHand);
    const [firstPlayer] = players.filter((player) => !player.isHand);

    const playing =
      handPlayer._count.PlayerCards > firstPlayer._count.PlayerCards
        ? handPlayer.id
        : firstPlayer.id;

    const reqParams = z.object({
      card_id: z.string(),
      user_id: z.string(),
    });
    const { card_id, user_id } = reqParams.parse(req.params);
    console.log(playing);

    if (user_id === playing) {
      const gameState = await prisma.gameState.findFirst();

      await prisma.cardsPlayed.create({
        data: {
          player_id: user_id,
          card_id: card_id,
          game_id: gameState.id,
          round: gameState.round,
        },
      });

      await prisma.playerCards.deleteMany({
        where: {
          card_id: card_id,
        },
      });
      await prisma.cards.updateMany({
        data: {
          available: true,
        },
        where: {
          id: card_id,
        },
      });

      console.log(gameState);

      console.log(card_id, user_id);
    } else {
      return { error: "cannot play card on opponent's turn" };
    }
  });
  /*
  app.patch("/removePlay", async (req) => {
    await prisma.cardsPlayed.delete({
      where: {
        id: "15e3b151-6167-4db1-8279-e9599aac6e9f",
      },
    });
  });
  */
}
