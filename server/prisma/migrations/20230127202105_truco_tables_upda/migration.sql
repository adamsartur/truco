-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "roundScore" INTEGER NOT NULL DEFAULT 0,
    "isHand" BOOLEAN NOT NULL DEFAULT false,
    "lastBet" BOOLEAN NOT NULL DEFAULT false,
    "envidoScore" INTEGER NOT NULL DEFAULT 0,
    "lastEnvido" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Player" ("id", "isHand", "roundScore", "score", "user") SELECT "id", "isHand", "roundScore", "score", "user" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
