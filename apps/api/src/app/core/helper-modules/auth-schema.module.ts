import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../shared/models/user.request.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: SchemaFactory.createForClass(User) },
    ]),
  ],
  exports: [MongooseModule],
})
export class AuthSchemaModule {}
