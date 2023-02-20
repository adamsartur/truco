-- CreateTable
CREATE TABLE "CardsPlayed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "envido" BOOLEAN NOT NULL DEFAULT false,
    "game_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    CONSTRAINT "CardsPlayed_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardsPlayed_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameState" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardsPlayed_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
