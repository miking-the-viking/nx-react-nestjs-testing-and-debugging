import { AppState } from '..';

const noApiKeyUserState: Partial<AppState> = {
    Auth: {
        user: {
            id: 'abc 123',
            name: 'someone',
            role: 'ADMIN' as any,
            created_at: new Date().toISOString(),
            email: 'something@somewhere.com',
            updated_at: new Date().toISOString(),
            api_keys: [],
            provider_users: [],
            repositories: [],
        },
        jwt: 'abc123',
    },
};

export default noApiKeyUserState;
