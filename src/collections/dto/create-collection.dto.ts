import {IsString,IsNotEmpty,IsArray,IsOptional}from 'class-validator';

export class CreateCollectionDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsArray()
    problems:string[];

    @IsString()
    @IsOptional()
    createdBy?:string;


}