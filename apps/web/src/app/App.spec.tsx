import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<App />);

        expect(baseElement).toBeTruthy();
    });

    it('should have a greeting as the title', () => {
        const { getByText } = render(<App />);

        expect(getByText('Welcome to web!')).toBeTruthy();
    });
});
