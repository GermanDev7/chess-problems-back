import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    } as { jwtFromRequest: any; ignoreExpiration: boolean; secretOrKey: string });
  }

  async validate(payload: any) {
     console.log('Payload recibido en JwtStrategy:', payload);
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
