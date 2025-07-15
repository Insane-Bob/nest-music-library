import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './music.entity';
import { User } from '../users/users.entity';

/**
 * MusicService provides CRUD operations for the music library.
 * All business logic related to music management is handled here.
 */
@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}

  /**
   * Create a new music entry associated with a user.
   * @param data Music data
   * @param user Owner user entity
   */
  async createMusic(data: Partial<Music>, user: User): Promise<Music> {
    const music = this.musicRepository.create({ ...data, user });
    return this.musicRepository.save(music);
  }

  /**
   * Get all musics belonging to a specific user.
   * @param userId User ID
   */
  async findAllByUser(userId: string): Promise<Music[]> {
    return this.musicRepository.find({ where: { user: { id: userId } } });
  }

  /**
   * Get a music by its ID.
   * @param id Music ID
   */
  async findOne(id: string): Promise<Music> {
    return this.musicRepository.findOne({ where: { id } });
  }

  /**
   * Update a music entry.
   * @param id Music ID
   * @param data Data to update
   * @throws BadRequestException if no update values are provided
   */
  async updateMusic(id: string, data: Partial<Music>): Promise<Music> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('No update values provided');
    }
    await this.musicRepository.update(id, data);
    return this.findOne(id);
  }

  /**
   * Delete a music entry.
   * @param id Music ID
   */
  async deleteMusic(id: string): Promise<void> {
    await this.musicRepository.delete(id);
  }

  /**
   * Get all musics in the library (admin only).
   */
  async findAll(): Promise<Music[]> {
    return this.musicRepository.find();
  }
}
