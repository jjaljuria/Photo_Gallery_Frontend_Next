import axios from 'axios';
import { serverApiDirection } from '../Helpers/ServerApiDirection';

const AxiosDefault = axios.create({
	baseURL: serverApiDirection,
});
export default AxiosDefault;