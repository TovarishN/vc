import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { App } from '../app';

describe("<App />", () => {
    afterEach(cleanup);

    test("app should render a button", async () => {
        let app = render(<App />);
        let loginButton = await app.findByTestId("login-button-testid");
        expect(loginButton).toHaveTextContent("Login");

        let registerButton = await app.findByTestId("register-button-testid");
        expect(registerButton).toHaveTextContent("Register");

        let mainContent = await app.findByTestId("main-content-testid");
        expect(mainContent).toHaveTextContent("You are not logged in");
    });
});