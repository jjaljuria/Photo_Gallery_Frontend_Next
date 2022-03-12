import PhotosContainer from '../Components/PhotosContainer';
import {useRouter} from 'next/router';


const Index = ()=>{
	return(
		<main className="container">
			<section className="row">
				<div className="col-4">
					<button className="btn btn-primary">Login</button>
				</div>
			</section>
			<PhotosContainer />
		</main>
	);
}

export default Index;