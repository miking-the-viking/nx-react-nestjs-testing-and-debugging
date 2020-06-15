import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { GraphqlModule } from '@king/data';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';

/**
 * The User Module is responsible for all functionality pertaining the domain of users of the application
 */
@Module({
    imports: [GraphqlModule, forwardRef(() => AuthModule)],
    providers: [UserService, UserResolver],
    exports: [UserService, UserResolver]
})
export class UserModule {}
