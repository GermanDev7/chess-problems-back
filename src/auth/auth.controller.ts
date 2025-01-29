import { Controller,Post,Body,Get,UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import {JwtGuard} from '../auth/jwt/jwt.guard'
import { Roles } from './decorators/roles.decorator';
import {RolesGuard} from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
    ){
        const user=await this.authService.validateUser(email,password);
        return this.authService.login(user)
    }

    @UseGuards(JwtGuard,RolesGuard)
    @Roles('admin')
    @Get('admin-route')
    getAdminRoute(){
        return{message: 'Solo los admins pueden ver esto'}
    }

    @UseGuards(JwtGuard,RolesGuard)
    @Roles('moderator','admin')
    @Get('moderator-route')
    getModeratorRoute(){
        return {message:'Moderadores y admins pueden ver esto'}
    }


    @UseGuards(JwtGuard)
    @Get('profile')
    getProfile(@Request() req){
        return {message:'Este es un endpoint protegido',user:req.user}
    }
}
