import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [OrdersModule, CartModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
