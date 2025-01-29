import { CanActivate,ExecutionContext,Injectable,ForbiddenException } from "@nestjs/common";
import {Reflector} from '@nestjs/core';
import { required } from "joi";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context:ExecutionContext):boolean | Promise<boolean> | Observable<boolean>{
        const requiredRoles= this.reflector.get<string[]>('roles',context.getHandler());
        if(!requiredRoles){
            return true;
        }

        const request= context.switchToHttp().getRequest();
        const user= request.user;

        if(!user || !requiredRoles.includes(user.role)){
            throw new ForbiddenException('No tienes permisos para acceder a esta ruta')
        }

        return true;
    }

}