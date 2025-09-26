import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Put
} from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';

@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Get()
  async findAll(@Query('type') type?: string, @Query('status') status?: 'online' | 'offline' | 'error') {
    let robots = await this.robotsService.findAll();

    if (type) {
      robots = await this.robotsService.getRobotsByType(type);
    }

    if (status) {
      robots = robots.filter(robot => robot.status === status);
    }

    return {
      success: true,
      data: robots,
      total: robots.length
    };
  }

  @Get('online')
  async getOnlineRobots() {
    const robots = await this.robotsService.getOnlineRobots();
    return {
      success: true,
      data: robots,
      total: robots.length
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const robot = await this.robotsService.findOne(id);
    return {
      success: true,
      data: robot
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRobotDto: CreateRobotDto) {
    const robot = await this.robotsService.create(createRobotDto);
    return {
      success: true,
      data: robot,
      message: 'Robot created successfully'
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    const robot = await this.robotsService.update(id, updateRobotDto);
    return {
      success: true,
      data: robot,
      message: 'Robot updated successfully'
    };
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'online' | 'offline' | 'error' }
  ) {
    const robot = await this.robotsService.updateStatus(id, body.status);
    return {
      success: true,
      data: robot,
      message: 'Robot status updated successfully'
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.robotsService.remove(id);
  }

  @Get(':id/health')
  async getHealthCheck(@Param('id') id: string) {
    const robot = await this.robotsService.findOne(id);
    const isHealthy = robot.status === 'online' &&
                     (new Date().getTime() - robot.lastSeen.getTime()) < 60000;

    return {
      success: true,
      data: {
        robotId: id,
        healthy: isHealthy,
        status: robot.status,
        lastSeen: robot.lastSeen,
        uptime: isHealthy ? new Date().getTime() - new Date(robot.lastSeen).getTime() : 0
      }
    };
  }
}