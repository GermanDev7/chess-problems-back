import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { CollectionSchema } from './collection.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:'Collection',schema:CollectionSchema}])],
    providers:[CollectionsService],
    controllers:[CollectionsController],
    exports:[CollectionsService]
})
export class CollectionsModule{}