import { Injectable } from '@nestjs/common';
import { Connection, ClientSession } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  async run(
    transaction: (session: ClientSession) => Promise<any>
  ): Promise<void> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await transaction(session);
      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
