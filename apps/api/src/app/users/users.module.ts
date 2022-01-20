import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  providers: [],
  imports: [],
  controllers: [UsersController],
})
export class UsersModule {}
