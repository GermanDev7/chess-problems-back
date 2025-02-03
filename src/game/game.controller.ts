import { Controller,Post,Body,Get,Query,UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('game')
@UseGuards(JwtGuard)
export class GameController {
    constructor(private readonly gameService:GameService){}

        @Post('start')
        startGame(
            @Body('collectionId') collectionId:string,
            @Body('timeLimit') timeLimit:number

        ){
            return this.gameService.startGame(collectionId,timeLimit)
        }

        @Post('submit')
        submitAswer(
            @Body('problemId') problemId:string,
            @Body('userAnswer') userAnswer:string
        ){
            return this.gameService.submitAnswer(problemId,userAnswer);
        }

        @Get('progress')
        getProgress(@Query('gameId')gameId:string){
            return this.gameService.getProgress(gameId)
        }
    
}
