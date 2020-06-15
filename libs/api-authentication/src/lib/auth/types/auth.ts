import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@king/data';

@ObjectType()
export class Auth {
    @Field({ description: 'JWT Bearer token' })
    token: string;

    @Field(type => User)
    user: User;
}
