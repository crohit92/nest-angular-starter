import { User } from '@bg-ng/api-interfaces';
import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
  providers: [],
  imports: [],
  controllers: [UsersController],
})
export class UsersModule {}
