
import { Link } from "react-router-dom"
import '../App.css'

export default function NavProfile() {
    return (
        <div className="Nav">
            <nav >
                <span id="logo">Stranger Things</span>
                <a href="/">HOME</a>
                <a href="/Posts">POSTS</a>
                <a href="/Profile?src=profile">PROFILE </a>
                <a href="/Profile?src=logout">LOGOUT </a>

                {/* <Link to="/Posts">POSTS</Link>
                <Link to="/Profile?src=profile">PROFILE </Link>
                <Link to="/Profile?src=logout">LOGOUT </Link> */}

            </nav>
            
        </div>

    )
}