import React, { ChangeEvent, useContext } from 'react';
import { LogIn, CheckedsHandler } from '../Helpers/Contexts';
import { Photo } from '../Helpers/Types/Photo'
import { serverApiDirection } from '../Helpers/ServerApiDirection';

function PhotoCard(props: { photo: Photo }) {
	const loggedIn = useContext(LogIn);
	const checksHandlers = useContext(CheckedsHandler);
	const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			checksHandlers.checked(e.target.value);
		} else {
			checksHandlers.unchecked(e.target.value);
		}
	}

	return (

		<div className="photo-card">
			{loggedIn.loggedIn ? <div className="position-absolute">
				<input type="checkbox" name="selectedForDelete" value={props.photo._id} onChange={checkHandler} className="form-check" />
			</div> : null}
			<img loading="lazy" src={`${serverApiDirection}/${props.photo.url}`} alt={props.photo.url} className="img-fluid" />
		</div>
	)
}

export default PhotoCard
