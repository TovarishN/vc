import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { App } from '../app';

describe("<App />", () => {
    afterEach(cleanup);

    test("app should render a button", async () => {
        let app = render(<App />);
        let button = await app.findByTestId("login-button-testid");
        expect(button).toHaveClass("button");

    });
});