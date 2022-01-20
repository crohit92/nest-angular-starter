import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JWTStrategy } from './auth-strategies/jwt-strategy.service';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './auth-strategies/local-strategy.service';
import { TransactionService } from './services/transaction.service';
import { AuthSchemaModule } from './helper-modules/auth-schema.module';
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '4h',
          },
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_HOST'),
        };
      },
    }),
    AuthSchemaModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    JWTStrategy,
    LocalStrategy,
    AuthService,
    JwtAuthGuard,
    TransactionService,
  ],
  exports: [
    JWTStrategy,
    AuthService,
    JwtAuthGuard,
    JwtModule,
    MongooseModule,
    TransactionService,
    AuthSchemaModule,
  ],
})
export class CoreModule {}
