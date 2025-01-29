import { MongooseModule } from '@nestjs/mongoose';
export const MongoConfig = MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/chess-problems');
