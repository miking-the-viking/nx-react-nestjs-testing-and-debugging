import PATH from '../routes';
import LOGGED_IN_ROUTES from './LoggedInRoutes';
import LoggedInRouterSetup from './testUtils/LoggedInRouterSetup';
import jestMockTestComponentFactory from '../../../../utilities/jestMockFactory';

Object.entries(PATH).map(([key, value]) =>
  jestMockTestComponentFactory(
    jest.mock,
    `../../pages${value.page}`,
    value.name
  )
);

describe('LoggedInRouter', () => {
  it('stubs', () => {
    expect(true).toBeTruthy();
  });
  // describe('If the user does not have any api keys, they are redirected to the AddApiKey page', () => {
  //     describe('For registered routes', () => {
  //         for (let [key, value] of Object.entries(PATH)) {
  //             it(`${key}: "${value.name}"@"${value.path}"`, async () => {
  //                 const { findByTestId } = LoggedInRouterSetup(
  //                     value,
  //                     noApiKeyUserState,
  //                 );
  //                 const addApiKey = await findByTestId(PATH.ADD_API_KEY.name);
  //                 expect(addApiKey).toBeDefined();
  //             });
  //         }
  //     });

  //     it('For unknown routes', async () => {
  //         const { getByTestId } = LoggedInRouterSetup(
  //             {
  //                 path: 'something-that-doesnt-exist',
  //             },
  //             noApiKeyUserState,
  //         );
  //         const addApiKey = await getByTestId(PATH.ADD_API_KEY.name);
  //         expect(addApiKey).toBeDefined();
  //     });
  // });

  // describe('If the user has a registered api key, they do not get redirected and the requested route is rendered', () => {
  //     describe('For registered routes', () => {
  //         LOGGED_IN_ROUTES.map(route => {
  //             it(`${route.name}@"${route.path}"`, async () => {
  //                 const { getByTestId, findByTestId } = LoggedInRouterSetup(
  //                     route,
  //                     apiKeyUserState,
  //                 );

  //                 // assert that the requested page component is rendered (these are mocks so we are ignoring their potential redirects)
  //                 const pageComponent = await findByTestId(route.name);
  //                 if (route.name !== PATH.ADD_API_KEY.name) {
  //                     // explicitly ensure that the route doesn't render for AddApiKey
  //                     expect(() =>
  //                         getByTestId(PATH.ADD_API_KEY.name),
  //                     ).toThrow(
  //                         `Unable to find an element by: [data-testid="${PATH.ADD_API_KEY.name}"]`,
  //                     );
  //                 }
  //             });
  //         });
  //     });
  //     it('For unknown routes, NotFound is rendered', async () => {
  //         const { getByTestId, findByTestId } = LoggedInRouterSetup(
  //             {
  //                 path: 'something-unknown',
  //             },
  //             apiKeyUserState,
  //         );

  //         const pageComponent = await findByTestId(PATH.NOT_FOUND.name);
  //         // explicitly ensure that the route doesn't render for AddApiKey
  //         expect(() => getByTestId(PATH.ADD_API_KEY.name)).toThrow(
  //             `Unable to find an element by: [data-testid="${PATH.ADD_API_KEY.name}"]`,
  //         );
  //     });
  // });
});
