-- DropIndex
DROP INDEX "Cart_userId_productId_key";

-- DropIndex
DROP INDEX "OrderProducts_orderId_name_key";

-- AlterTable
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId", "productId");

-- AlterTable
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("orderId", "name");
