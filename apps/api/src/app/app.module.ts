import { Module } from '@nestjs/common';
import { AuthModule } from '@king/api-authentication';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiklModule } from './vehikl/vehikl.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
            // resolvers: { JSON: GraphQLJSON },
            debug: true,
            playground: true,
            context: ({ req }) => ({ req }),
            installSubscriptionHandlers: false
        }),
        AuthModule,
        VehiklModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
