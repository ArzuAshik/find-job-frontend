import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../App';

const Navbar = () => {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    return (
        <nav>            
            <h2><Link to="/">Online Job Market Place.</Link></h2>
            {
                userInfo.email ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/auth">Login</Link>
            }
        </nav>
    );
};

export default Navbar;