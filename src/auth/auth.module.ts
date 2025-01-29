import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule} from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
  imports:[UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi-clave-secreta',
      signOptions: { expiresIn: '1h' }
   })
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
