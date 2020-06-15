import React from 'react';
import { render } from '@testing-library/react';

import UiComponents from './UiComponents';

describe(' UiComponents', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiComponents />);
        expect(baseElement).toBeTruthy();
    });
});
