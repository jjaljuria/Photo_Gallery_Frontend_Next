import React, { useEffect, useState } from 'react'
import Avatar from './Avatar';
import PhotoCollection from './PhotoCollection';
import * as PhotoService from '../Services/PhotoService';
import * as AvatarService from '../Services/AvatarService';
import * as LoginService from '../Services/LoginService';
import { Photo } from '../Helpers/Types/Photo';
import { useRouter } from 'next/router';
import BarSavePhoto from './BarSavePhoto';
import { LogIn, CheckedsHandler } from '../Helpers/Contexts';
import DeleteButtom from './DeleteButton';
import Logout from './Logout';

interface Param {
	username: string;
}

function PhotosContainer() {
	const router = useRouter();
	const { username } = router.query ?? '';
	const [avatar, setAvatar] = useState('');
	const [photos, setPhotos] = useState(Array<Photo>());
	const [logged, setLogged] = useState({ loggedIn: false });
	const [progress, setProgress] = useState(0);
	let [checkeds, setCheckeds] = useState(Array<string>());

	const loadAvatar = async () => {

		const res = await AvatarService.getAvatar(username as string);
		console.log({res});
		if(res)
			setAvatar(res);

	}

	const loadPhotos = async () => {

		const res = await PhotoService.getPhotos(username as string);
		if(res)
			setPhotos(res);

	}

	const savePhoto = async (file: FormData) => {
		const uploadProgress = (data: ProgressEvent) => {
			setProgress(Math.round(data.loaded / data.total * 100))
		}

		PhotoService.savePhotos(file, uploadProgress)
			.then(response => {
				alert('Foto subida exitosamente');
				loadPhotos();
			})
			.catch(error => {
				console.log(error);
				setProgress(0);
			});
	}

	const verifyLogin = async () => {
		const res = await LoginService.verifyLogin();
		setLogged(res);
	}

	const selectedPhotoHandler = (id: string) => {
		const copy = Array.from(checkeds);
		copy.push(id);
		setCheckeds(copy);
	}

	const unselectedPhotoHandler = (id: string) => {
		const res = checkeds.filter((check) => check !== id);
		setCheckeds(res);
	}

	const selectedHandlers = {
		checked: selectedPhotoHandler,
		unchecked: unselectedPhotoHandler
	}

	const deletePhotos = async () => {
		const res = await PhotoService.deletePhotos(checkeds);
		console.log(res);
		loadPhotos();
	}

	const changeImageAvatar = async (avatar: FormData) => {
		const res = await AvatarService.updateAvatar(avatar);
		console.log(res);
		loadAvatar();
	}

	useEffect(() => {
		loadAvatar();
		loadPhotos();
		verifyLogin();
	}, [router.query]);


	return (
		<div className="mt-4">
			{logged.loggedIn ? <Logout /> : ''}
			{avatar ?
				<div>
					<Avatar image={avatar} onChangeAvatar={changeImageAvatar} logged={logged}>
						<h3>{username}</h3>
					</Avatar>
					{logged.loggedIn ?
						<>
							<DeleteButtom onDelete={deletePhotos} />
							<BarSavePhoto savePhoto={savePhoto} logged={logged} progress={progress} />
						</>
						: ''}
					<CheckedsHandler.Provider value={selectedHandlers}>
						<LogIn.Provider value={logged}>
							<PhotoCollection photos={photos} />
						</LogIn.Provider>
					</CheckedsHandler.Provider>
				</div>
				:
				<div className="text-center">
					<h1>User Not Found</h1>
				</div>
			}
		</div>
	)
}

export default PhotosContainer
