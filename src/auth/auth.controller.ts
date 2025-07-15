import { Body, Controller, Post, HttpCode, HttpStatus, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TwoFactorDto } from './dto/twofactor.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login a user
   *
   * @param signInDto
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  /**
   * Register a new user
   *
   * @param registerDto
   */
  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Request a password reset
   *
   * @param email Email address of the user
   */
  @Public()
  @Get('validate-email')
  async validateEmail(@Query('token') token: string) {
    return this.authService.validateEmail(token);
  }

  /**
   * Verify two-factor authentication
   *
   * @param dto Two-factor authentication data
   */
  @Public()
  @Post('2fa')
  verifyTwoFactor(@Body() dto: TwoFactorDto) {
    return this.authService.verifyTwoFactor(dto);
  }
}
