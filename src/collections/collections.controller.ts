import {Controller,Get,Post,Body,Param,Delete,Put,UseGuards}from '@nestjs/common'
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('collections')
@UseGuards(JwtGuard)
export class CollectionsController{
    constructor(private readonly collectionsService:CollectionsService){}

    @Post()
    @Roles('admin', 'moderator') 
    create(@Body() createCollectionDto:CreateCollectionDto){
        return this.collectionsService.create(createCollectionDto);
    }

    @Get()
    findAll(){
        return this.collectionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id:string){
        return this.collectionsService.findOne(id);
    }

    @Put(':id')
    @Roles('admin', 'moderator') // Solo admin y moderadores pueden crear y actualiar
    update(@Param('id')id:string,@Body() updateDto:Partial<CreateCollectionDto>){
        return this.collectionsService.update(id,updateDto)
    }

    @Delete(':id')
    remove(@Param('id')id:string){
        return this.collectionsService.delete(id);
    }


}