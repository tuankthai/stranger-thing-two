
// import '../App.css'

import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div>
           
            <nav >
                <span id="logo">Stranger Things</span>

                <a href="/">HOME</a>
                <a href="/Posts">POSTS</a>
                <a href="/Profile?src=login">LOGIN </a>

                {/* <Link to="/Posts">POSTS</Link> */}
                {/* <Link to="/Profile?src=login">LOGIN </Link> */}
            </nav>
            
        </div>

    )
}