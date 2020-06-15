import { UserQuery } from '@king/hasura';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

type UserType = UserQuery['users_by_pk'];

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

registerEnumType(Role, {
    name: 'Role',
    description: 'User role'
});

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    created_at: string;

    @Field()
    updated_at: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(type => Role)
    role: Role | string;
}
