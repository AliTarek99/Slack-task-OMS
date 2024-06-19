import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body('productId') productId: number, @Body('userId') userId: number) {
    return await this.cartService.add(userId, productId);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.cartService.get(+id);
  }

  @Put('update')
  async update(@Body('userId') userId: number, @Body("quantity") quantity: number, @Body('productId') productId: number) {
    return await this.cartService.update(userId, productId, quantity);
  }

  @Delete('remove')
  async delete(@Body('userId') userId: number, @Body('productId') productId: number) {
    return await this.cartService.remove(userId, productId);
  }
}
