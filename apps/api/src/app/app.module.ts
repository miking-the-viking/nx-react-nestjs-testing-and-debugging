import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, UserModule } from '@kwjs/api-authentication';
import { GraphqlModule } from '@kwjs/data';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
            // resolvers: { JSON: GraphQLJSON },
            debug: true,
            playground: true,
            context: ({ req }) => ({ req }),
            installSubscriptionHandlers: true,
            subscriptions: {
                onConnect: (connectionParams, ws, context) => {
                    console.log('subscription onConnect');
                },
                onDisconnect: (ws, context) => {
                    console.log('subscription onDisconnect');
                }
            }
        }),
        GraphqlModule,
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
