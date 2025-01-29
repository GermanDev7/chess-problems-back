import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.schema';
import {UserModelName} from './user.schema'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModelName) private userModel:Model<User>){}

    async createUser(username:string,email:string,password:string,role:string):Promise<User>{
        const salt = await bcrypt.genSalt(10); // Genera un salt
        const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña
        const newUser=new this.userModel({username,email,password:hashedPassword,role});
        return newUser.save()
    }

    async findUserByEmail(email:string):Promise<User | null>{
        return this.userModel.findOne({email})
    }
}
