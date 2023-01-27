/*
  Warnings:

  - Added the required column `round` to the `GameState` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "roundScore" INTEGER NOT NULL DEFAULT 0,
    "isHand" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Player" ("id", "roundScore", "score", "user") SELECT "id", "roundScore", "score", "user" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
CREATE TABLE "new_GameState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bet" INTEGER NOT NULL,
    "round" INTEGER NOT NULL
);
INSERT INTO "new_GameState" ("bet", "id") SELECT "bet", "id" FROM "GameState";
DROP TABLE "GameState";
ALTER TABLE "new_GameState" RENAME TO "GameState";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
