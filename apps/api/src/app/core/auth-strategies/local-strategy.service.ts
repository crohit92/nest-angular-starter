import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { environment } from '../../../environments/environment';
import { User } from '@bg-ng/api-interfaces';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
