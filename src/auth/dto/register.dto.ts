import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
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
    description: "Le mot de passe de l'utilisateur (au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial)",
    example: 'Password-1234&',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.',
    },
  )
  password: string;

  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: "Le nom de famille de l'utilisateur",
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
