import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() userId: number) {
    return await this.ordersService.create(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(+id);
  }

  @Patch(':id/status')
  async update(@Param('id') id: string, @Body() status: string) {
    return await this.ordersService.update(+id, status);
  }
}
