import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsIn } from 'class-validator';
import { RobotCapability } from '../entities/robot.entity';

export class CreateRobotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsNumber()
  port: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  capabilities?: RobotCapability[];

  @IsOptional()
  metadata?: Record<string, any>;
}