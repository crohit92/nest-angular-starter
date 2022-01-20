import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import {
  User,
  LoginResponse,
  CreateUser,
  Credentials,
} from '@bg-ng/api-interfaces';
import { AuthService } from '../core/services/auth.service';
import { ApiTagsAndBearer } from '../core/decorators/api-bearer-tag.decorator';
import { LocalAuthGuard } from '../core/guards/local-auth.guard';

@ApiTagsAndBearer('Auth')
@Controller('users')
export class UsersController {
  constructor(private readonly service: AuthService) {}
  @Post('signup')
  async signup(@Body() req: CreateUser) {
    await this.service.saveUser(req as any);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() cred: Credentials,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponse> {
    const accessToken = await this.service.getJwtToken(req.user);
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Req() req: Request) {
    return req.user;
  }
}
