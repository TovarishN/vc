import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchApi } from "../../common/fetch";

export const RegisterDialog: React.FC = () => {

	const history = useHistory();

	const [username, setUserName] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isloading, setIsLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");

	const RegisterClick = async () => {
		try {
			setIsLoading(true);
			let res = await fetchApi('/user/register', { username, firstname, lastname, email, password });
			setIsLoading(false);
			history.push('/');
		}
		catch (error) {
			if(error instanceof Error)
				setErrorMessage(error.message);
		}
	};

	return (

		<div className="dialog">
			<div className="dialog-title">Register</div>
			<div className="fields">
				<label htmlFor="username">Username</label><input id="username" name="username" onChange={(e) => setUserName(e.target.value)} type="text" autoComplete="off" />
				<label htmlFor="firstname">First Name</label><input id="firstname" name="firstname" onChange={(e) => setFirstName(e.target.value)} type="text" autoComplete="off" />
				<label htmlFor="lastname">Last Name</label><input id="lastname" name="lastname" onChange={(e) => setLastName(e.target.value)} type="text" autoComplete="off" />
				<label htmlFor="email">Email</label><input id="email" name="email" onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="off" />
				<label htmlFor="password">Password</label><input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="off" />
			</div>
			<div className="button" onClick={RegisterClick}>{isloading ? "Wait" : "Register"}</div>

			<div className="message">{errorMessage}</div>
		</div>
	);
};