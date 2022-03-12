import axios from '../Helpers/AxiosDefault'; //axios configurado por mi jjaljuria

axios.defaults.withCredentials = true;

export const Login = async (user: { email: string, password: string }) => {

	return await (await axios.post(`/user/login`, user)).data;
}

export const verifyLogin = async () => {
	const token = window.localStorage.getItem('token');
	if (!token) return { loggedIn: false };

	return await (await axios.get(`/user/login`, {
		headers: { 'x-access-token': token }
	})).data;
}

export const Logout = async () =>{
	window.localStorage.removeItem('token');
	window.location.reload();
}