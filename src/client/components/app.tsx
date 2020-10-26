import React, { useState } from 'react';
import '../scss/app.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginDialog } from './login_dialog';
import { StoreContext } from '../utils/utils';
import { RegisterDialog } from './register_dialog';

interface UserInfo {
	username: string;
}

export const UserContext = React.createContext<null | StoreContext<UserInfo>>(null);

const App: React.FC = () => {

	const [userName, setUserName] = useState<string|null>(null);

	const store : StoreContext<UserInfo> = {
		username: userName!,
		setusername: setUserName
	};

	return (
		<UserContext.Provider value={store}>
			<Router>
				<div className="app">
					<nav>
						<div className="userInfo">{userName ? userName : "none"}</div>
						<ul>
							<li>{userName ? <LogoutButton click={() => setUserName("")} /> : <LoginButton />}  </li>
							<li><Link to="/register">Register</Link></li>
						</ul>
					</nav>

					<Switch>
						<Route path="/login"><LoginDialog /></Route>
						<Route path="/register"><RegisterDialog /></Route>
					</Switch>
				</div>
			</Router>
		</UserContext.Provider>
	);
};

const LoginButton = () => (<Link to="/login">Login</Link>);

const LogoutButton: React.FC<{click: ()=>void}> = (props) => (<button onClick={props.click}>Logout</button>);

export { App };
