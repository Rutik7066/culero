import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOAuthStrategyFactory } from '../oauth/factory/google/google-strategy.factory';
import { GoogleStrategy } from '../oauth/strategy/google/google.strategy';
import { FacebookOAuthStrategyFactory } from '../oauth/factory/facebook/facebook-strategy.factory';
import { LinkedInOAuthStrategyFactory } from '../oauth/factory/linkedin/linkedin-strategy.factory';
import { FacebookStrategy } from '../oauth/strategy/facebook/facebook.strategy';
import { LinkedInStrategy } from '../oauth/strategy/linkedin/linkedin.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        issuer: 'culero',
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleOAuthStrategyFactory,
    {
      provide: GoogleStrategy,
      useFactory: (googleOAuthStrategyFactory: GoogleOAuthStrategyFactory) => {
        googleOAuthStrategyFactory.createOAuthStrategy();
      },
      inject: [GoogleOAuthStrategyFactory],
    },
    FacebookOAuthStrategyFactory,
    {
      provide: FacebookStrategy,
      useFactory: (
        facebookOAuthStrategyFactory: FacebookOAuthStrategyFactory,
      ) => {
        facebookOAuthStrategyFactory.createOAuthStrategy();
      },
      inject: [FacebookOAuthStrategyFactory],
    },
    LinkedInOAuthStrategyFactory,
    {
      provide: LinkedInStrategy,
      useFactory: (
        linkedinOAuthStrategyFactory: LinkedInOAuthStrategyFactory,
      ) => {
        linkedinOAuthStrategyFactory.createOAuthStrategy();
      },
      inject: [LinkedInOAuthStrategyFactory],
    },
  ],
})
export class AuthModule {}
