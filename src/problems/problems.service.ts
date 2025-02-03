import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem, ProblemDocument } from './problem.schema';
import { CreateProblemDto, UpdateProblemDto } from './dto/problems.dto';
import { SortOrder } from 'mongoose';
@Injectable()
export class ProblemsService {
    constructor(
        @InjectModel(Problem.name) private problemModel: Model<ProblemDocument>
    ) { }

    async findWithFilters(
        eloMin?: number,
        eloMax?: number,
        theme?: string,
        timeLimit?: number,
        sortBy?: string
      ): Promise<Problem[]> {
        const filters: any = {};
      
        if (eloMin !== undefined || eloMax !== undefined) {
          filters.elo = {};
          if (eloMin !== undefined) {
            filters.elo.$gte = eloMin;
          }
          if (eloMax !== undefined) {
            filters.elo.$lte = eloMax;
          }
        }
      
        if (theme) {
          filters.theme = theme;
        }
      
        if (timeLimit !== undefined) {
          filters.timeLimit = { $lte: timeLimit };
        }
      
        const sortOptions: { [key: string]: SortOrder } = sortBy === 'elo' ? { elo: 1 } : { createdAt: -1 };
      
        return this.problemModel.find(filters).sort(sortOptions).exec();
      }
      

    async create(createProblemDto: CreateProblemDto): Promise<Problem> {
        const newProblem = new this.problemModel(createProblemDto);
        return newProblem.save();
    }

    async findAll(): Promise<Problem[]> {
        return this.problemModel.find().exec();
    }

    async findOne(id: string): Promise<Problem> {
        const problem = await this.problemModel.findById(id).exec();
        if (!problem) {
            throw new NotFoundException(`Problem with ID ${id} not found`)
        }
        return problem;
    }

    async update(id: string, UpdateProblemDto: UpdateProblemDto): Promise<Problem> {
        const updateProblem = await this.problemModel
            .findByIdAndUpdate(id, UpdateProblemDto, { new: true })
            .exec();
        if (!updateProblem) {
            throw new NotFoundException(`Problem with ID ${id} not found`);
        }
        return updateProblem;
    }

    async remove(id: string): Promise<void> {
        const result = await this.problemModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Problem with ID ${id} not foud`)
        }
    }

    async updateElo(id: string, wasSuccesful: boolean): Promise<void> {
        const problem = await this.problemModel.findById(id).exec();
        if (!problem) {
            throw new NotFoundException(`Problem with ID ${id} not found`)
        }
        //increment
        problem.attempt += 1;

        if (wasSuccesful) {
            problem.elo += 10;//calculate
        } else {
            problem.elo = Math.max(0, problem.elo - 10);
        }

        await problem.save();
    }
}
