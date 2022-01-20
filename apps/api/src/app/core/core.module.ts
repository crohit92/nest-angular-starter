import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../../environments/environment';
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
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: {
        expiresIn: '4h',
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/mca?replicaSet=rs0'),
    AuthSchemaModule,
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
