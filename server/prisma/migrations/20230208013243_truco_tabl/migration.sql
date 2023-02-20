/*
  Warnings:

  - You are about to drop the `CardsPlayed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CardsPlayed";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cards_played" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "envido" BOOLEAN NOT NULL DEFAULT false,
    "game_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    CONSTRAINT "cards_played_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_played_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameState" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_played_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_played_id_key" ON "cards_played"("id");
