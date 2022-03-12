import axios from '../Helpers/AxiosDefault'; //axios configurado por mi jjaljuria

export const getAvatar = async(username: string)=>{
	if(username !== undefined)
		return await (await axios.get(`/user/avatar/${username}`)).data;
}

export const updateAvatar = async (avatar: FormData) =>{
	return await (await axios.put(`/user/avatar`, avatar,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})).data;
}