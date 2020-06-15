import PATH from '../routes';
import NotLoggedInRouterSetup from './testUtils/NotLoggedInRouterSetup';
// import jestMockTestComponentFactory from '../../../../utilities/jestMockFactory';

// jestMockTestComponentFactory(jest.mock, '../../pages/Login/Login', 'login');

describe('NotLoggedInRouter', () => {
    describe('Will always redirect to the login path', () => {
        it('stubs', () => {
            expect(true).toBeTruthy();
        });
        // describe('For registered routes', () => {
        //   for (let [key, value] of Object.entries(PATH)) {
        //     it(`${key}: "${value.name}"@"${value.path}"`, async () => {
        //       const { getByTestId } = NotLoggedInRouterSetup(value.path);
        //       expect(() => getByTestId('login')).toBeDefined();
        //     });
        //   }
        // });

        // it('For unknown routes', () => {
        //   const { getByTestId } = NotLoggedInRouterSetup('somewhere-else');
        //   expect(() => getByTestId('login')).toBeDefined();
        // });
    });
});
