import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { ProblemsModule } from '../problems/problems.module';
import { CollectionsModule } from '../collections/collections.module';
import { GameSessionService } from "./game-session.service";
import { GameAttemptService } from "./game-attempt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GameSession, GameSessionSchema } from "./game-session.schema";
import { GameAttempt, GameAttemptSchema } from "./game-attempt.schema";

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: GameSession.name, schema: GameSessionSchema },
        { name: GameAttempt.name, schema: GameAttemptSchema }
      ]),
        ProblemsModule,  
        CollectionsModule 
      ],
    controllers:[GameController],
    providers:[GameService,GameSessionService,GameAttemptService],
    exports:[GameService,GameSessionService,GameAttemptService]
})

export class GameModule{}