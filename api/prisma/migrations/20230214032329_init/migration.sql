-- CreateEnum
CREATE TYPE "RoomAccess" AS ENUM ('Private', 'Protected', 'Public', 'DirectMessage');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('Opened', 'Closed', 'Deleted');

-- CreateEnum
CREATE TYPE "RoomUserRole" AS ENUM ('Owner', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "RoomUserStatus" AS ENUM ('Invit', 'Member', 'ExMember');

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "firstTime" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twoFactorAuthenticationCode" TEXT,
    "isTwoFactorAuthenticationEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("user1Id","user2Id")
);

-- CreateTable
CREATE TABLE "blocked_users" (
    "blockerId" INTEGER NOT NULL,
    "blockedId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocked_users_pkey" PRIMARY KEY ("blockerId","blockedId")
);

-- CreateTable
CREATE TABLE "chat_rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "status" "RoomStatus" NOT NULL DEFAULT 'Opened',
    "access" "RoomAccess" NOT NULL DEFAULT 'Public',
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "redCornerId" INTEGER NOT NULL,
    "redCornerScore" INTEGER NOT NULL DEFAULT 0,
    "blueCornerId" INTEGER NOT NULL,
    "blueCornerScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "map" TEXT NOT NULL DEFAULT 'default',

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenges" (
    "challengerId" INTEGER NOT NULL,
    "challengedId" INTEGER NOT NULL,
    "map" TEXT NOT NULL DEFAULT 'default',

    CONSTRAINT "Challenges_pkey" PRIMARY KEY ("challengerId","challengedId")
);

-- CreateTable
CREATE TABLE "rooms_users" (
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "RoomUserRole" NOT NULL DEFAULT 'User',
    "ban" BOOLEAN NOT NULL DEFAULT false,
    "mute" BOOLEAN NOT NULL DEFAULT false,
    "status" "RoomUserStatus" NOT NULL DEFAULT 'Member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_users_pkey" PRIMARY KEY ("roomId","userId")
);

-- CreateTable
CREATE TABLE "RoomUserMsg" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "msg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomUserMsg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_users" ADD CONSTRAINT "blocked_users_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_users" ADD CONSTRAINT "blocked_users_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_redCornerId_fkey" FOREIGN KEY ("redCornerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_blueCornerId_fkey" FOREIGN KEY ("blueCornerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenges" ADD CONSTRAINT "Challenges_challengedId_fkey" FOREIGN KEY ("challengedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms_users" ADD CONSTRAINT "rooms_users_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chat_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms_users" ADD CONSTRAINT "rooms_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUserMsg" ADD CONSTRAINT "RoomUserMsg_roomId_userId_fkey" FOREIGN KEY ("roomId", "userId") REFERENCES "rooms_users"("roomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;