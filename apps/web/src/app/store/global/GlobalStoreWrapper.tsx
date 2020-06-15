import React from 'react';
import { Provider } from 'react-redux';
import store from '.';

const GlobalStoreWrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

const GlobalStoreProvider: React.FC = ({ children }) => (
    <Provider store={store}>
        <GlobalStoreWrapper>{children}</GlobalStoreWrapper>
    </Provider>
);

export default GlobalStoreProvider;
