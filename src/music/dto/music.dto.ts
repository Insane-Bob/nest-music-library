import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a music entry
 */
export class CreateMusicDto {
  @ApiProperty({ example: 'L.A. WOMAN' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'The Doors' })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({ example: 'L.A. Woman', required: false })
  @IsString()
  @IsOptional()
  album?: string;
}

/**
 * DTO for updating a music entry
 */
export class UpdateMusicDto {
  @ApiProperty({ example: 'Bohemian Rhapsody', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Queen', required: false })
  @IsString()
  @IsOptional()
  artist?: string;

  @ApiProperty({ example: 'A Night at the Opera', required: false })
  @IsString()
  @IsOptional()
  album?: string;
}
