import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from './collection.schema'
import { CreateCollectionDto } from './dto/create-collection.dto'

@Injectable()
export class CollectionsService {
    constructor(
        @InjectModel('Collection') private readonly collectionModel: Model<Collection>
    ) { }
    async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
        const newCollection = new this.collectionModel(createCollectionDto)
        return newCollection.save();
    }

    async findAll(): Promise<Collection[]> {
        return this.collectionModel.find().populate('problems').exec();
    }

    async findOne(id: String): Promise<Collection> {
        const collection = await this.collectionModel.findById(id).populate('problems');
        if (!collection) {
            throw new NotFoundException(`Collection with ID ${id} not found`)
        }
        return collection;
    }

    async update(id: string, updateDto: Partial<CreateCollectionDto>): Promise<Collection> {
        const updatedCollection = await this.collectionModel.findByIdAndUpdate(id, updateDto, { new: true, }).populate('problems');
        if (!updatedCollection) {
            throw new NotFoundException(`Collection with ID ${id} not found`)
        }
        return updatedCollection;
    }

    async delete(id: string): Promise<void> {
        const result = await this.collectionModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`Collection with ID ${id} not found`)
        }
    }

}

