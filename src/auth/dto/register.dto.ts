import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: "L'adresse email de l'utilisateur",
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    example: 'motdepasse123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    example: 'Jean',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: "Le nom de famille de l'utilisateur",
    example: 'Dupont',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
