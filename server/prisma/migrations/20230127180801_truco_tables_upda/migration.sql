/*
  Warnings:

  - You are about to drop the column `roundScore` on the `GameState` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `GameState` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bet" INTEGER NOT NULL
);
INSERT INTO "new_GameState" ("bet", "id") SELECT "bet", "id" FROM "GameState";
DROP TABLE "GameState";
ALTER TABLE "new_GameState" RENAME TO "GameState";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "roundScore" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Player" ("id", "user") SELECT "id", "user" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
