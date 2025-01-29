import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, UserModelName} from './user.schema'
@Module({
  imports:[MongooseModule.forFeature([{name:UserModelName,schema:UserSchema}])],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
