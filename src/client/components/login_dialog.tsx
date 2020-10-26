import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ApiPath } from "../../common/settings";
import { UserContext } from "./app";

import { LoginResult } from "../../common/response";

export const LoginDialog: React.FC = () => {

    const history = useHistory();
    const ctx = useContext(UserContext);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const LoginClick = async () => {
        let res = await Login(username, password);
        ctx?.setusername(username);
        history.goBack();
    };

    return (
        <div className="login">
            <label htmlFor="username">Username</label><input id="username" name="username"
                onChange={(e) => setUserName(e.target.value)} type="text" />
            <label htmlFor="password"> Password</label><input id="password" name="password"
                onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={LoginClick}>Login</button>
        </div>
    );
};


const Login = async (username: string, password: string): Promise<LoginResult> => {
    try {
        let response = await fetch(`${ApiPath}/login`, {
            headers: {"Content-Type": "application/json"},
            method: "post"
            , body: JSON.stringify({ username, password })
        });
        let res = await response.json();
        let _a = 34;
    }
    catch (error) {

    }

    return { result: "success" };
};