import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";

export type GameAttemptDocument= GameAttempt &Document;

@Schema({timestamps:true})
export class GameAttempt{
    @Prop({required:true,type:Types.ObjectId,ref:'GameSession'})
    sessionId: Types.ObjectId;

    @Prop({required:true})
    problemId:string;

    @Prop({required:true})
    wasCorrect:boolean;

    @Prop({required:true})
    timeTaken:number;
}

export const GameAttemptSchema=SchemaFactory.createForClass(GameAttempt);