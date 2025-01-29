import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum:['user','moderator','admin'],default: 'user' })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelName = 'User';