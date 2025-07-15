import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './music.entity';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), UsersModule],
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
