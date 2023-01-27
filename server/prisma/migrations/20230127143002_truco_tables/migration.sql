/*
  Warnings:

  - You are about to drop the `day_habits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `days` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `habit_week_days` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `habits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "day_habits";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "days";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "habit_week_days";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "habits";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "hand" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" TEXT NOT NULL,
    "bet" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suit" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_id_key" ON "Cards"("id");
