import { Injectable, NotFoundException } from '@nestjs/common';
import { ProblemsService } from 'src/problems/problems.service';
import { CollectionsService } from 'src/collections/collections.service';
import { GameSessionService } from './game-session.service';
import { GameAttemptService } from './game-attempt.service';
@Injectable()
export class GameService {
    private activeGames = new Map<string, any>();

    constructor(
        private readonly problemsService: ProblemsService,
        private readonly collectionsService: CollectionsService,
        private readonly gameSessionService: GameSessionService,
        private readonly gameAttemptService: GameAttemptService
    ) { }

    async startGame(collectionId: string, timeLimit: number, userId: string) {
        const collection = await this.collectionsService.findOne(collectionId);
        if (!collection) {
            throw new NotFoundException(`Collection with ID ${collectionId} not found`)
        }
        const problems = collection.problems;

        const session = await this.gameSessionService.createSession(userId, collectionId, new Date())
        const gameId = session._id.toString();

        this.activeGames.set(gameId, {
            problems,
            timeLimit,
            currentIndex: 0,
            correctAnswers: 0,
            startTime: new Date().getTime()
        });

        return { gameId, problemsCount: problems.length, timeLimit };
    }

    async submitAnswer(problemId: string, userAnswer: string, sessionId: string) {
        const problem = await this.problemsService.findOne(problemId)
        if (!problem) {
            throw new NotFoundException(`Problem with ID ${problemId} not found`)
        }

        const isCorrect = problem.solution == userAnswer;

        const game = this.activeGames.get(sessionId);
        let timeTaken = 0;
        if (game) {
            timeTaken = Math.floor((new Date().getTime() - game.startTime) / 1000)
            game.currentIndex += 1;

            if (isCorrect) {
                game.correctAnswers += 1;
            }
        }

        await this.gameAttemptService.createAttemp(sessionId, problemId, isCorrect, timeTaken)

        return { correct: isCorrect, correctAnswer: problem.solution };
    }

    async getProgress(gameId: string) {

        const session = await this.gameSessionService.getSession(gameId);
        if (!session) {
            throw new NotFoundException(`Game session with ID ${gameId} not found`)
        }

        const attempts = await this.gameAttemptService.findAttemptsBySession(gameId)
        const totalAttempts = attempts.length;
        const correctAttempts = attempts.filter(a => a.wasCorrect).length;
        const succesRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

        return {
            session,
            attempts,
            totalAttempts,
            correctAttempts,
            succesRate
        }
    }
}
