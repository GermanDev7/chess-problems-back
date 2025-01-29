import { Module } from '@nestjs/common';
import { MongoConfig } from './config/mongo.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProblemsModule } from './problems/problems.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validations';

@Module({
  imports: [MongoConfig,AuthModule,UsersModule,ProblemsModule,  ConfigModule.forRoot({ isGlobal: true,  validationSchema, })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
