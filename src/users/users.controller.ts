import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users (admin only)E
   * @returns Array of User objects
   */
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Get a user by their ID
   * @param id User ID in UUID format
   * @returns User object if found, null if not found or invalid ID format
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<User> {
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
      return null;
    }
    return this.usersService.findOne(id);
  }
}
