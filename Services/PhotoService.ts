import axios from '../Helpers/AxiosDefault';
axios.defaults.withCredentials = true;

export const getPhotos = async (username: string) => {
	if(username !== undefined)
		return await (await axios.get(`photos/${username}`)).data;
}

export const savePhotos = (photo: FormData, uploadProgress: any) => {

	return axios.post(`/photos`, photo, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Origin': '*',
		}, onUploadProgress: uploadProgress
	});
}

export const deletePhotos = async (checkedIds: string[]) => {
	return await axios.delete('/photos', { data: checkedIds });
}