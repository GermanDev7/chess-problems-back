import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { ProblemsModule } from '../problems/problems.module';
import { CollectionsModule } from '../collections/collections.module';

@Module({
    imports: [
        ProblemsModule,  
        CollectionsModule 
      ],
    controllers:[GameController],
    providers:[GameService],
    exports:[GameService]
})

export class GameModule{}