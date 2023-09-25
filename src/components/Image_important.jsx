
import '../App.css'
import Nav from './Nav'
import smilingDog from '../assets/smiling-dog.avif'

export default function Image() {

    return (
        <div>
            <Nav />
            <img src={smilingDog} alt="smiling dog"/>
        </div>
    );
}