import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: string,
    ): Promise<User> {
        return this.usersService.createUser(username, email, password,role)
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<User | null> {
        return this.usersService.findUserByEmail(email)
    }
}
