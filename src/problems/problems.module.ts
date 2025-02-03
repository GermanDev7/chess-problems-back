import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { ProblemSchema } from './problem.schema';
@Module({
  imports:[
    MongooseModule.forFeature([{name:'Problem',schema:ProblemSchema}])],
  providers: [ProblemsService],
  controllers: [ProblemsController],
  exports:[ProblemsService],
})
export class ProblemsModule {}
