import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService {
    constructor(private readonly databaseService: DatabaseService) {}

    async add (userId: number, productId: number) {
        let cartProduct = await this.databaseService.cart.findFirst({where: {productId: productId, userId: userId}}) as Prisma.CartUpdateInput;
        let product = await this.databaseService.products.findFirst({where: {productId: productId}});
        if(product.stock >= (cartProduct? +cartProduct.quantity + 1: 1)) {
            if(cartProduct) {

                cartProduct.quantity = +cartProduct.quantity + 1;
                return await this.databaseService.cart.update({
                    data: cartProduct, 
                    where: {
                        userId_productId: {
                            userId: userId, 
                            productId: productId
                        }
                    }
                });
                
            }
            else {
                return await this.databaseService.cart.create({data: {quantity: 1, productId: productId, userId: userId}});
            }
        }
        else return {message: 'not enough in stock.'};
    }

    async get(userId: number) {
        return await this.databaseService.cart.findMany({where: {userId: userId}, include: {products: true}});
    }

    async update(userId: number, productId: number, quantity: number) {
        if(quantity == 0) {
            return await this.remove(userId, productId);
        }
        let cartProduct = await this.databaseService.cart.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        }) as Prisma.CartUpdateInput;
        
        let product = await this.databaseService.products.findFirst({where: {productId: productId}});
        if(product.stock >= quantity) {
            if(cartProduct) {
                cartProduct.quantity = quantity;
                return await this.databaseService.cart.update({data: cartProduct, where: {userId_productId: {userId: userId, productId: productId}} as Prisma.CartWhereUniqueInput});
                
            }
            else {
                return await this.databaseService.cart.create({data: {quantity: quantity, productId: productId, userId: userId}});
            }
        }
        else return {message: 'not enough in stock.'};
    }

    async remove(userId: number, productId: number) {
        let cartProduct = await this.databaseService.cart.findFirst({where: {productId: productId, userId: userId}}) as Prisma.CartUpdateInput;
        if(cartProduct) {
            return (await this.databaseService.cart.delete({where: {userId_productId: {userId: userId, productId: productId}} as Prisma.CartWhereUniqueInput})) && 1;
        }
    }
}
