import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./app";
import { fetchApi } from "../../common/fetch";

export const LoginDialog: React.FC = () => {

    const history = useHistory();
    const ctx = useContext(UserContext);
    const [username, setUserName] = useState(ctx.username);
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const LoginClick = async () => {
        try {
            let res = await fetchApi('/user/login', {username: username, password: password});
            if (res.result === 'success')
            {
                ctx.setusername(username);
                ctx.setisAuthenticated(true);
                history.push('/');
            }
            else 
                setErrorMessage(res.message);
        }
        catch(e) {
            if(e instanceof Error)
                setErrorMessage(e.message);
        }
    };

    return (
        <div className="dialog">
            <div className="dialog-title">Login</div>
            <div className="fields">
                <label htmlFor="username">Username</label><input id="username" name="username"
                    onChange={(e) => setUserName(e.target.value)} type="text" value={username} />
                <label htmlFor="password"> Password</label><input id="password" name="password"
                    onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <div className="button" onClick={LoginClick}>Login</div>
            {errorMessage}
        </div>
    );
};
