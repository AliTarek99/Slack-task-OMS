import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number) {
    let order = (await this.databaseService.orders.createManyAndReturn({data: [{status: 'New', userId: userId}]}))[0];
    
    let products = (await this.databaseService.cart.findMany({where: {userId: userId}, include: {products: true}})).map(value => {
      return {
        orderId: order.orderId, 
        name: value.products.name, 
        quantity: value.quantity,
        price: value.products.price,
      } as Prisma.OrderProductsCreateManyInput
    });

    this.databaseService.cart.deleteMany({where: {userId: userId}});
    await this.databaseService.orderProducts.createMany({data: products});
    return order;
  }

  async findOne(id: number) {
    return await this.databaseService.orders.findFirst({where: {orderId: id}, include: {products: true}});
  }

  async update(id: number, status: string) {
    let order = await this.databaseService.orders.findFirst({where: {orderId: id}});
    if(order) {
      order.status = status;
      return await this.databaseService.orders.update({where: {orderId: id}, data: order});
    }
    else throw new NotFoundException();
  }
}
