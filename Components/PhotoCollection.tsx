import React from 'react'
import { Photo } from '../Helpers/Types/Photo';
import PhotoCard from './PhotoCard';


const PhotoCollection = (props: { photos: Photo[] }) => {

	const photoCards = props.photos.map( photo =>{
		return (
			<div className="col-md-3 my-1 px-1" key={photo._id}>
				<PhotoCard photo={photo} />
			</div>
		);
	})

	return (
		<section className="row" >
			{photoCards}
		</section>
	)
}

export default PhotoCollection
