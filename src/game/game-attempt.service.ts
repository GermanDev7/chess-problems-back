import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameAttempt, GameAttemptDocument } from "./game-attempt.schema";

@Injectable()
export class GameAttemptService {
    constructor(
        @InjectModel(GameAttempt.name) private readonly gameAttemptModel: Model<GameAttemptDocument>
    ) { }

    async createAttemp(sessionId: string, problemId: string, wasCorrect: boolean, timeTaken: number): Promise<GameAttempt> {
        const newAttempt = new this.gameAttemptModel({
            sessionId,
            problemId,
            wasCorrect,
            timeTaken,
        });
        return newAttempt.save()
    }

    async findAttemptsBySession(sessionId: string): Promise<GameAttempt[]> {
        return this.gameAttemptModel.find({ sessionId }).exec();
    }
}