import { Module } from '@nestjs/common';
import { MongoConfig } from './config/mongo.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProblemsModule } from './problems/problems.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validations';
import { GameModule } from './game/game.module';
@Module({
  imports: [MongoConfig, AuthModule, UsersModule, ProblemsModule, CollectionsModule,GameModule, ConfigModule.forRoot({ isGlobal: true, validationSchema, })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
