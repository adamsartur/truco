/*
  Warnings:

  - You are about to drop the column `hand` on the `Player` table. All the data in the column will be lost.
  - Added the required column `discarded` to the `GameState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundScore` to the `GameState` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "player_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    CONSTRAINT "player_cards_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_cards_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" TEXT NOT NULL,
    "bet" INTEGER NOT NULL,
    "discarded" TEXT NOT NULL,
    "roundScore" TEXT NOT NULL
);
INSERT INTO "new_GameState" ("bet", "id", "score") SELECT "bet", "id", "score" FROM "GameState";
DROP TABLE "GameState";
ALTER TABLE "new_GameState" RENAME TO "GameState";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL
);
INSERT INTO "new_Player" ("id", "user") SELECT "id", "user" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "player_cards_id_key" ON "player_cards"("id");
