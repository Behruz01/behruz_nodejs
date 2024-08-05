import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, LogoutDto } from './dto/create-auth.dto';
import { TokenService } from 'src/shared/token.service';

@ApiTags("Auth")
@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logout successfully' })
  logout(@Body() logoutDto: LogoutDto) {
    return this.tokenService.logout(logoutDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh token' })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  refresh(@Body() tokenDto: LogoutDto) {
    return this.tokenService.refresh(tokenDto);
  }

  @Post('superadminlogin')
  @ApiOperation({ summary: 'SuperAdmin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'SuperAdmin logged in successfully',
  })
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.superadminLogin(loginDto);
  }
}
