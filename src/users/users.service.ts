import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(registerDto: Record<string, any>) {
    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async validateEmail(token: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ validationToken: token });
    if (!user) {
      return { message: 'Invalid or expired token.' };
    }
    user.isEmailValidated = true;
    user.validationToken = null;
    await this.userRepository.save(user);
    return { message: 'Email validated successfully for user: ' + user.email};
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
