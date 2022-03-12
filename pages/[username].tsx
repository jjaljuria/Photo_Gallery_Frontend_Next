import PhotosContainer from '../Components/PhotosContainer';
import {useRouter} from 'next/router';


const Index = ()=>{
	return(
		<main className="container">
			<PhotosContainer />
		</main>
	);
}

export default Index;