import {IsArray,IsEnum, IsNotEmpty,IsNumber,IsOptional,IsString,Min} from 'class-validator';

export class CreateProblemDto{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    fen:string;

    
    @IsString()
    solution:string

    @IsNumber()
    @Min(0)
    @IsOptional()
    elo?:number;

    @IsString()
    @IsEnum(['tactic','endgame','strategy'])
    theme:string

    @IsNumber()
    @IsOptional()
    timeLimit?:number;
}

export class UpdateProblemDto extends CreateProblemDto{}