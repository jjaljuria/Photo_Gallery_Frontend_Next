import React, { ReactElement, useState, ChangeEvent, FormEvent } from 'react'
import { serverApiDirection } from '../Helpers/ServerApiDirection';

interface Avatar {
	image: string
	children: ReactElement,
	onChangeAvatar: (avatar: FormData) => void,
	logged: { loggedIn: boolean, user?: string };
}

const Avatar = (props: Avatar) => {

	const [isHover, setIsHover] = useState(false);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isShowedAvatarForm, setIsShowedAvatarForm] = useState(false);

	const mouseEnterHandler = (e: any) => {
		if (!isShowedAvatarForm && props.logged.loggedIn)
			setIsHover(true);
	}

	const mouseLeaveHandler = (e: any) => {
		if (!isShowedAvatarForm && props.logged.loggedIn)
			setIsHover(false);
	}

	const showAvatarFormHandler = (e: any): void => {
		if (props.logged.loggedIn) {
			setIsHover(false);
			setIsShowedAvatarForm(true);
		}
	}

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFilePicked) {
			const formData = new FormData();
			formData.append('image', selectedFile);
			props.onChangeAvatar(formData);

		}
	}

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const errors = [];
		const maxSize = 1000000 // 1MB mas o menos
		const soportFormat = ['image/jpeg', 'image/png']
		const files = e.target.files as FileList;
		const file = files[0];
		let fileType;
		let fileSize;
		if (file) {
			fileType = file.type;
			fileSize = file.size;
		} else {
			fileType = 'not selected';
			fileSize = NaN;
		}


		// Validations
		// if (!props.logged.loggedIn) {
		// 	errors.push('operacion solo para usuarios autorizados');
		// }

		if (!soportFormat.includes(fileType) && fileType !== 'not selected') {
			errors.push('formato de la imagen no valido, solo se aceptan jpg y png');
		}

		if (fileType === 'not selected') {
			errors.push('ninguna imagen seleccionada');
		}

		if (fileSize > maxSize) {
			errors.push('tamaño de la imagen demasiado grande (debe ser de menos de un 1MB)');
		}

		toProcessErrors(errors, file);

	}

	const toProcessErrors = (errors: string[], file: File): void => {

		if (errors.length) {
			setIsFilePicked(false);
			setSelectedFile(null);
			showErrors(errors);
		} else {
			setSelectedFile(file);
			setIsFilePicked(true);

		}
	}

	const showErrors = (errors: string[]) => {
		errors.forEach(error => alert(error));
	}

	const closeAvatarFormHandler = (e: any) => {
		setIsShowedAvatarForm(false);
	}

	return (
		<section className="row">
			<div className="offset-md-4 col-md-4 text-center p-0
			position-relative" style={{ display: 'inline-block' }}>

				<img src={`${serverApiDirection}/${props.image}`} alt="Avatar" className="img-fluid rounded-circle avatar-size" onMouseEnter={mouseEnterHandler} />


				{isHover ?
					<div className="d-flex justify-content-center avatar-edit-container" onMouseLeave={mouseLeaveHandler} onClick={showAvatarFormHandler}>
						<div className="avatar-edit rounded-circle d-flex justify-content-center align-items-center">
							<i className="fa fa-edit fa-2x"></i>
						</div>
					</div>
					: ''
				}



			</div>
			<div className="col-12 col-md-4 offset-md-4 text-center">
				{props.children}
			</div>
			{isShowedAvatarForm ?
				<form className="col-md-4 border border-dark p-1 overflow-hidden offset-md-4" onSubmit={submitHandler}>
					<input type="file" name="avatar" className="m-1" onChange={changeHandler} />
					<button type="submit" className="btn btn-primary mr-1">Guardar</button>
					<button onClick={closeAvatarFormHandler} className="btn btn-secondary">cancelar</button>
				</form>
				: ''}

		</section>
	)
}

export default Avatar
