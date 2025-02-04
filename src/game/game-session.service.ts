import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GameSession, GameSesssionDocument } from "./game-session.schema";


@Injectable()
export class GameSessionService {
    constructor(
        @InjectModel(GameSession.name) private readonly gameSessionModel: Model<GameSesssionDocument>
    ) { }

    async createSession(userId: string, collectionId: string, startTime: Date): Promise<GameSesssionDocument> {
        const session = new this.gameSessionModel({
            userId,
            collectionId,
            startTime,
            problemsAttempted: 0,
            problemsCorrect: 0,
            finalScore: 0,
            attemptDetails: []
        })
        return session.save();
    }

    async getSession(sessionId:string):Promise<GameSession>{
        const session=await this.gameSessionModel.findById(sessionId);
        if(!session){
            throw new NotFoundException( `Game session with ID ${sessionId} not found`)
        }
        return session;
    }

    async updateSession(sessionId:string,updateData:Partial<GameSession>):Promise<GameSession>{
        const updatedSession=await this.gameSessionModel.findByIdAndUpdate(sessionId,updateData,{new:true})
        if(!updatedSession){
            throw new NotFoundException(`Game session with ID ${sessionId} not found`)
        }
        return updatedSession
    }   
}