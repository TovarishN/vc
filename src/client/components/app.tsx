import React, { useState } from 'react';
import '../scss/app.scss';
import { Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { LoginDialog } from './login_dialog';
import { StoreContext } from '../utils/utils';
import { RegisterDialog } from './register_dialog';
import Cookies, { set } from 'js-cookie';
import { fetchApi } from '../../common/fetch';

interface UserInfo {
	username: string;
	isAuthenticated: boolean;
}


const history = createBrowserHistory();
export const UserContext = React.createContext<null | StoreContext<UserInfo>>(null);


const getAuthentication = () : UserInfo => {
	let cookie = Cookies.get('auth');
	return {username: cookie, isAuthenticated: !!cookie };
};

const App: React.FC = () => {

	const auth = getAuthentication();

	const [userName, setUserName] = useState<string|null>(auth.username);
	const [isAuth, setAuthenticated] = useState(auth.isAuthenticated);

	const store : StoreContext<UserInfo> = {
		username: userName!,
		setusername: setUserName,
		isAuthenticated: isAuth,
		setisAuthenticated: setAuthenticated
	};

	const Logout = () => {
		let res = fetchApi('/logout', {});
		setUserName("");
		setAuthenticated(false);
	};

	return (
		<UserContext.Provider value={store}>
			<Router history={history}>
				<div className="app">
					<nav data-testid="nav-testid">
							{!isAuth ? (<div className="button" onClick={() => history.push('/login')} data-testid="login-button-testid">Login</div>) 
									: (<div className="button" onClick={() => Logout()} data-testid="logout-button-testid">Logout</div>)}

							<div className="button" onClick={() => history.push('/register')} data-testid="register-button-testid">Register</div>
						
					</nav>

					<Switch>
						
						<Route path="/login"><LoginDialog /></Route>
						<Route path="/register"><RegisterDialog /></Route>
						<Route path="/">
							<div className="main-content" data-testid="main-content-testid">
								{isAuth ? `You are logged in, ${userName}`
										: `You are not logged in`}
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		</UserContext.Provider>
	);
};

const LogoutButton: React.FC<{click: ()=>void}> = (props) => (<div className="button" onClick={props.click}>Logout</div>);

export { App };
