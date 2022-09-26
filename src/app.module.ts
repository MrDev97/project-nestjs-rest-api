import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
