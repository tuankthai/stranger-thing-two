
import { logout } from "./Helper";
import Home from './Home'

export default function Logout({ setToken }) {
    setToken("");
    logout();
    return (
        <div>
            <Home />
        </div>
    )
}