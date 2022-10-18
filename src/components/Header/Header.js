import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoggedContext } from "../../ctx/LoggedContext";
import { CartListContext } from "../../ctx/CartListContext";

const Header = ({ setIsCartOpen }) => {

    const { isLoggedIn } = useContext(LoggedContext);
    const { cartList } = useContext(CartListContext);

    const openCartPopUp = () => {
        setIsCartOpen(true);
    };

    return (
        <div onClick={()=>{console.log(cartList)}} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '85px', borderBottom: '3px solid #000' }}>
            <nav>
                <li>
                    <NavLink to="/homepage">Home</NavLink>
                </li>
                {isLoggedIn || localStorage.length > 0 ? null : <li><NavLink to="/signup">Sign Up</NavLink></li>}
                {isLoggedIn || localStorage.length > 0 ? <li><NavLink to="/dashboard">Dashboard</NavLink></li> : <li><NavLink to="/login">Login</NavLink></li>}
            </nav>
            <div onClick={openCartPopUp} style={{ margin: 'auto 25px auto 0', padding: '6px 21px', backgroundColor: '#eee', fontWeight: 'bold', border: '3px solid #000', borderRadius: '25px', boxSizing: 'border-box', cursor: 'pointer' }}>
                <span>Your Cart: </span>
                <span>{Object.keys(cartList).length}</span>
            </div>
        </div>
    )
}

export default Header;