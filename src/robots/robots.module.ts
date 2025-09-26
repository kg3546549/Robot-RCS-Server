import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { Robot as RobotSchema, RobotSchema as RobotSchemaDefinition } from './schemas/robot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RobotSchema.name, schema: RobotSchemaDefinition }])
  ],
  controllers: [RobotsController],
  providers: [RobotsService],
  exports: [RobotsService],
})
export class RobotsModule {}