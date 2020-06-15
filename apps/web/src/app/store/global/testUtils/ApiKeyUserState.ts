import { AppState } from '..';
import noApiKeyUserState from './NoApiKeyUserState';
import { Provider } from '../../../gql/generated/types';

const apiKeyAppState: Partial<AppState> = {
    ...noApiKeyUserState,

    Auth: {
        user: {
            ...(noApiKeyUserState.Auth?.user || {
                api_keys: [],
                created_at: new Date().toISOString(),
                email: 'someemail@test.com',
                id: '123',
                provider_users: [],
                repositories: [],
                role: 'USER',
                updated_at: new Date().toISOString()
            }),
            api_keys: [
                {
                    id: 'asdfasdf',
                    name: 'test key',
                    provider: Provider.Sample as any,
                    created_at: new Date().toISOString(),
                    user: {} as any,
                    user_id: 'asdfkhdfjkghldkjg',
                    key: null as any,
                    repositories: []
                }
            ]
        } as AppState['Auth']['user'],
        jwt: ''
    }
};

export default apiKeyAppState;
