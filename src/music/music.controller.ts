import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch, Delete, ForbiddenException, ValidationPipe } from '@nestjs/common';
import { MusicService } from './music.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CreateMusicDto, UpdateMusicDto } from './dto/music.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('Music')
@ApiBearerAuth()
@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Add a music to the authenticated user's library
   * @param data Music data to add
   * @param req Request containing the user's JWT
   */
  @ApiOperation({ summary: 'Add a music to your library' })
  @ApiBody({ type: CreateMusicDto })
  @ApiResponse({ status: 201, description: 'Music added successfully.' })
  @Post()
  async addMusic(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) data: CreateMusicDto,
    @Request() req
  ) {
    const user = await this.usersService.findOne(req.user.sub);
    return this.musicService.createMusic(data, user);
  }

  /**
   * Get all musics belonging to the authenticated user
   * @param req Request containing the user's JWT
   */
  @ApiOperation({ summary: 'Get all your musics' })
  @ApiResponse({ status: 200, description: 'List of your musics.' })
  @Get()
  async getMyMusics(@Request() req) {
    return this.musicService.findAllByUser(req.user.sub);
  }

  /**
   * Update a music if the user is the owner or an admin
   * @param id Music ID
   * @param data Data to update
   * @param req Request containing the user's JWT
   */
  @ApiOperation({ summary: 'Update a music' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateMusicDto })
  @ApiResponse({ status: 200, description: 'Music updated successfully.' })
  @Patch(':id')
  async updateMusic(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) data: UpdateMusicDto,
    @Request() req
  ) {
    const music = await this.musicService.findOne(id);
    if (!music) throw new ForbiddenException('Music not found');
    if (music.user.id !== req.user.sub && req.user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this music');
    }
    return this.musicService.updateMusic(id, data);
  }

  /**
   * Delete a music if the user is the owner or an admin
   * @param id Music ID
   * @param req Request containing the user's JWT
   */
  @ApiOperation({ summary: 'Delete a music' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Music deleted successfully.' })
  @Delete(':id')
  async deleteMusic(@Param('id') id: string, @Request() req) {
    const music = await this.musicService.findOne(id);
    if (!music) throw new ForbiddenException('Music not found');
    if (music.user.id !== req.user.sub && req.user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this music');
    }
    await this.musicService.deleteMusic(id);
    return { message: 'Music deleted' };
  }

  /**
   * Get all musics in the library (admin only)
   */
  @Roles('admin')
  @ApiOperation({ summary: 'Get all musics in the library (admin only)' })
  @ApiResponse({ status: 200, description: 'List of all musics.' })
  @Get('all')
  async getAllMusics() {
    return this.musicService.findAll();
  }
}
