import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> |Observable<boolean> {
     const req = context.switchToHttp().getRequest();
    // console.log('📌 Token en JwtAuthGuard:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    //console.log('📌 Token recibido:', token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi-clave-secreta');
      //console.log('🔍 Token decodificado:', decoded);
    } catch (error) {
      //console.log('❌ Error al decodificar el token:', error.message);
    }
  }
    return super.canActivate(context);
  }
}
