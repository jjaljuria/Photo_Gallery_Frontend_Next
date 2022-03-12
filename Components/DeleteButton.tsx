import React from 'react';

const DeleteButtom = (props: {onDelete: ()=> void }) => {
	return (
		<div>
			<button className="btn btn-danger" onClick={props.onDelete}>Borrar</button>
		</div>
	);
}

export default DeleteButtom
