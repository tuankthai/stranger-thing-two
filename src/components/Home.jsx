
import NavProfile from "./NavProfile";
import Nav from './Nav'
import isLoggedIn, { getUsername } from "./Helper"
import "../App.css"

export default function Home() {
    return (
        <div className="welcome"> 
            {/* <Nav /> */}
            {
                isLoggedIn() ?
                    (< NavProfile />)
                    :
                    (<Nav />)
            }
            <h1>Welcome to Stranger Things</h1>
            {getUsername () &&
                <h1>Login as {getUsername()} </h1>
            }
            {/* {getUsername() &&
                <button
                >VIEW PROFILE</button>
            } */}
        </div>
    )
}