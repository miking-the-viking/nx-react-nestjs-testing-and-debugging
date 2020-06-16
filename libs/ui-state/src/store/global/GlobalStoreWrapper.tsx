import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppState } from '.';

const GlobalStoreWrapper: React.FC = ({ children }) => {
    // subscription to keep games up to date

    const dispatch = useDispatch();

    return <Provider store={store}>{children}</Provider>;
};

export const GlobalStoreProvider: React.FC = ({ children }) => (
    <Provider store={store}>
        <GlobalStoreWrapper>{children}</GlobalStoreWrapper>
    </Provider>
);

export default GlobalStoreProvider;
