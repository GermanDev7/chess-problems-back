import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProblemDocument = Problem & Document;

@Schema()
export class Problem {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    fen: string;

    @Prop({ required: true, type: String })
    solution: string

    @Prop({ required: true, default: 1200 })
    elo: number

    @Prop({ default: 0 })
    attempt: number;

    @Prop({ required: true, enum: ['tactic', 'endgame', 'strategy'] })
    theme: string;


    @Prop({ default: 5 })
    timeLimit: number;

    @Prop({ defaul: Date.now })
    createdAt: Date;

}

export const ProblemSchema = SchemaFactory.createForClass(Problem);