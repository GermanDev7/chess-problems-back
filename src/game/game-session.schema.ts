import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GameSesssionDocument = GameSession & Document& {
    _id: string;
  };

@Schema({ timestamps: true })
export class GameSession {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    collectionId: string

    @Prop({ required: true })
    startTime: Date;

    @Prop()
    endTime: Date;

    @Prop({ default: 0 })
    problemsAttempted: number;

    @Prop({ default: 0 })
    problemsCorrect: number;

    @Prop({ default: 0 })
    finalScore: number;

    @Prop({
        type: [{
            problemId: String,
            wasCorrect: Boolean,
            timeTaken: Number
        }]
    })
    attemptDetails: { problemId: string; wasCorrect: boolean; timeTaken: number }[]
}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession);

