import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto, UpdateProblemDto } from './dto/problems.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('problems')
export class ProblemsController {
    constructor(private readonly problemsService: ProblemsService) { }

    @Get('search')
    findWithFilters(
        @Query('eloMin') eloMin?: string,
        @Query('eloMax') eloMax?: string,
        @Query('theme') theme?: string,
        @Query('timeLimit') timeLimit?: string,
        @Query('sortBy') sortBy?: string
    ) {
        return this.problemsService.findWithFilters(
            eloMin ? parseInt(eloMin) : undefined,
            eloMax ? parseInt(eloMax) : undefined,
            theme,
            timeLimit ? parseInt(timeLimit) : undefined,
            sortBy
        );
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'moderator')
    @Post()
    create(@Body() createProblemDto: CreateProblemDto) {
        return this.problemsService.create(createProblemDto);
    }

    @Get()
    findAll() {
        return this.problemsService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.problemsService.findOne(id)
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'moderator')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
        return this.problemsService.update(id, updateProblemDto)
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'moderator')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.problemsService.remove(id)
    }


    @Patch(':id/attempt')
    updateElo(
        @Param('id') id: string,
        @Body('wasSuccesful') wasSuccessful: boolean
    ) {
        return this.problemsService.updateElo(id, wasSuccessful)
    }
}
