import React from 'react';
import { render, cleanup, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { App } from '../app';

describe("<App />", () => {
    afterEach(cleanup);

    test("app should render Login, Register and content", async () => {
        let app = render(<App />);
        let loginButton = await app.findByTestId("login-button-testid");
        expect(loginButton).toHaveTextContent("Login");
        
        let registerButton = await app.findByTestId("register-button-testid");
        expect(registerButton).toHaveTextContent("Register");

        let mainContent = await app.findByTestId("main-content-testid");
        expect(mainContent).toHaveTextContent("You are not logged in");

        loginButton.click();

        let Username = await app.getByText("Username");
        expect(Username).toBeTruthy();

        let Password = await app.getByText("Password");
        expect(Password).toBeTruthy();

    });
});