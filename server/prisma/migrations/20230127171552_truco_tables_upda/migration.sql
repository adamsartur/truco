/*
  Warnings:

  - You are about to drop the column `discarded` on the `GameState` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suit" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Cards" ("id", "number", "suit", "value") SELECT "id", "number", "suit", "value" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
CREATE UNIQUE INDEX "Cards_id_key" ON "Cards"("id");
CREATE TABLE "new_GameState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" TEXT NOT NULL,
    "bet" INTEGER NOT NULL,
    "roundScore" TEXT NOT NULL
);
INSERT INTO "new_GameState" ("bet", "id", "roundScore", "score") SELECT "bet", "id", "roundScore", "score" FROM "GameState";
DROP TABLE "GameState";
ALTER TABLE "new_GameState" RENAME TO "GameState";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
