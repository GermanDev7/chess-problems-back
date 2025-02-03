import { Injectable, NotFoundException } from '@nestjs/common';
import { ProblemsService } from 'src/problems/problems.service';
import { CollectionsService } from 'src/collections/collections.service';
@Injectable()
export class GameService {
    private activeGames = new Map<string, any>();

    constructor(
        private readonly problemsService: ProblemsService,
        private readonly collectionsService: CollectionsService
    ) { }

    async startGame(collectionId: string, timeLimit: number) {
        const collection = await this.collectionsService.findOne(collectionId);
        if (!collection) {
            throw new NotFoundException(`Collection with ID ${collectionId} not found`)
        }
        const problems = collection.problems;

        const gameId = Math.random().toString(36).substring(2)
        this.activeGames.set(gameId, {
            problems,
            timeLimit,
            currentIndex: 0,
            correctAnswers: 0,
            startTime: new Date().getTime()
        });

        return { gameId, problemsCount: problems.length, timeLimit };
    }

    async submitAnswer(problemId: string, userAnswer: string) {
        const problem = await this.problemsService.findOne(problemId)
        console.log(problem)
        if (!problem) {
            console.log(problemId,problem)
            throw new NotFoundException(`Problem with ID ${problemId} not found`)
        }

        const isCorrect = problem.solution == userAnswer;
        return { correct: isCorrect, correctAnswer: problem.solution };
    }

    getProgress(gameId: string) {
        const game = this.activeGames.get(gameId);
        if (!game) {
            throw new NotFoundException(`Game with ID ${gameId} not found`)
        }

        const elapsedTime = (new Date().getTime() - game.startTime) / 60000;
        const remainingTime = game.timeLimit - elapsedTime;

        return {
            remainingTime,
            currentIndex: game.currentIndex,
            correctAnswer: game.correctAnswers,
            totalProblems: game.problems.length
        }
    }
}
