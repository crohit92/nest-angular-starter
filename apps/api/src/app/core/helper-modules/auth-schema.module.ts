import { User } from '@bg-ng/api-interfaces';
import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: SchemaFactory.createForClass(User) },
    ]),
  ],
  exports: [MongooseModule],
})
export class AuthSchemaModule {}
