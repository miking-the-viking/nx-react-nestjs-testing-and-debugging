import { User } from '@kwjs/data';
import { ExecutionContext, Inject, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Context, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '../decorators/user.decorator';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    public static USER_NOT_FOUND = 'User Not Found';

    constructor(
        // @Inject('PUB_SUB') private pubSub: PubSub,
        private readonly userService: UserService,
        private readonly moduleRef: ModuleRef // private readonly apiKeyService: ProviderApiKeyService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(returns => User)
    async me(@CurrentUser() user: User) {
        return await this.userService.getMe(user.id);
    }
}
