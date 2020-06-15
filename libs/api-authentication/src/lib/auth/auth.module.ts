import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { authConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: authConstants.jwtSecret,
            signOptions: { expiresIn: '180s' }
        }),
        forwardRef(() => UserModule)
    ],
    providers: [
        AuthService,
        AuthResolver,
        JwtStrategy,
        GqlAuthGuard,
        PasswordService
    ],
    exports: [AuthService, GqlAuthGuard, AuthResolver]
})
export class AuthModule {}
