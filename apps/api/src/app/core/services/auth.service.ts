import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { User } from '@bg-ng/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { TransactionService } from './transaction.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User & Document>,
    private readonly transaction: TransactionService
  ) {}
  async saveUser(user: User) {
    return await this.transaction.run(async (session) => {
      user.username = user.username?.toLowerCase()?.trim();
      user.email = user.email?.toLowerCase()?.trim();
      const match =
        (await this.getUserByUsername(user.email)) ||
        (await this.getUserByUsername(user.username));
      if (match) {
        throw new HttpException(
          'Username/Email should be unique',
          HttpStatus.CONFLICT
        );
      } else {
        const hashedPwd = await hash(user.password, 10);
        user.password = hashedPwd;
        await new this.userModel(user).save({ session });
      }
    });
  }

  async getUserByUsername(username: string) {
    username = username.toLowerCase().trim();
    return await this.userModel.findOne({
      $or: [
        {
          email: username,
        },
        {
          username: username,
        },
      ],
    });
  }

  async validateUser(credentials: {
    username: string;
    password: string;
  }): Promise<Partial<User>> {
    const user = await this.getUserByUsername(credentials.username);
    if (user && (await compare(credentials.password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      };
    }
    return null;
  }

  async getJwtToken(user: Partial<User>) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }
}
