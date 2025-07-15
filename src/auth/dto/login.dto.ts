import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
        'Le mot de passe est incorrect.',
    },
  )
  password: string;
}
