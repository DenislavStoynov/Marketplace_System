import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoggedContext } from "../../ctx/LoggedContext";
const Header = () => {
    const { isLoggedIn } = useContext(LoggedContext);
    return (
        <div>
            <nav>
                <li>
                    <NavLink to="/homepage">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
                {isLoggedIn || localStorage.length > 0 ? <li><NavLink to="/dashboard">Dashboard</NavLink></li> : <li><NavLink to="/login">Login</NavLink></li>}
            </nav>
        </div>
    )
}

export default Header;