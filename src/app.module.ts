import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotsModule } from './robots/robots.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/robot-management'),
    RobotsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}