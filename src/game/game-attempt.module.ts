import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GameAttempt, GameAttemptSchema } from "./game-attempt.schema";
import { GameAttemptService } from "./game-attempt.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: GameAttempt.name, schema: GameAttemptSchema }]),
    ],
    providers: [GameAttemptService],
    exports: [GameAttemptService],
})
export class GameAttemptModule { }
