/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productName` on the `OrderProducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,name]` on the table `OrderProducts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrderProducts_orderId_productName_key";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey";

-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "productName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_productId_key" ON "Cart"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderProducts_orderId_name_key" ON "OrderProducts"("orderId", "name");

-- CreateIndex
CREATE INDEX "Orders_orderId_idx" ON "Orders"("orderId");

-- CreateIndex
CREATE INDEX "Products_productId_idx" ON "Products"("productId");

-- CreateIndex
CREATE INDEX "Users_userId_idx" ON "Users"("userId");
