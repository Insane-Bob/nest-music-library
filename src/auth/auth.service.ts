import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailerService } from '../mailer/mailer.service';
import { TwoFactorDto } from './dto/twofactor.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async login(email: string, pass: string): Promise<{ message: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isEmailValidated) {
      throw new UnauthorizedException('Email not validated');
    }

    // Generate 2FA code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFactorCode = code;
    user.twoFactorCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await this.usersService.update(user);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre code de connexion (2FA)',
      text: `Votre code : ${code}`,
    });
    return { message: 'Un code vous a été envoyé par email' };
  }

  async verifyTwoFactor(dto: TwoFactorDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user || !user.twoFactorCode || !user.twoFactorCodeExpires) {
      throw new UnauthorizedException('Invalid 2FA request');
    }
    if (user.twoFactorCode !== dto.code || user.twoFactorCodeExpires < new Date()) {
      throw new UnauthorizedException('Invalid or expired code');
    }

    // Clear code after successful login
    user.twoFactorCode = null;
    user.twoFactorCodeExpires = null;
    await this.usersService.update(user);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const validationToken = randomBytes(32).toString('hex');
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      isEmailValidated: false,
      validationToken,
      role: 'user',
    });
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Validation de votre email',
      text: `Cliquez ou copier le lien suivant pour valider votre compte : http://localhost:3000/auth/validate-email?token=${validationToken}`,
    });
    return { message: 'Compte créé avec succès, veuillez valider votre email' };
  }

  async validateEmail(token: string) {
    return this.usersService.validateEmail(token);
  }
}
