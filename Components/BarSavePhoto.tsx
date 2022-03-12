import React, { ChangeEvent, FormEvent, useState } from 'react'

interface Props {
	savePhoto(file: FormData): void;
	logged: { loggedIn: boolean, user?: string };
	progress: number;
}

const BarSavePhoto = (props: Props) => {

	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedFile, setSelectedFile] = useState<any>();

	const savePhotoHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFilePicked) {
			const formData = new FormData();
			formData.append('image', selectedFile);

			props.savePhoto(formData);
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
		if (!props.logged.loggedIn) {
			errors.push('operacion solo para usuarios autorizados');
		}

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



	return (
		<div className="row border border-dark py-2 align-items-center">
			<div className="col-md-6 px-1 overflow-hidden">
				<form action="" method="POST" onSubmit={savePhotoHandler} >
					<button type="submit" disabled={!isFilePicked} className="btn btn-primary mr-1">Guardar</button>
					<input type="file" onChange={changeHandler} />
				</form>
			</div>
			{isFilePicked ?
				<><div className="col-md-2">
					{selectedFile.size} Bytes
				</div>
					<div className="col-md-4">
						<progress value={props.progress} max="100" className="w-100">{props.progress + '%'}</progress>
					</div></>
				: ''}
		</div>
	)
}

export default BarSavePhoto
