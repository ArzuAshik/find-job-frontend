import React, { useContext } from 'react';
import { UserContext } from '../App';

const Navbar = () => {
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useContext(UserContext);
    return (
        <nav>
            Navbar
        </nav>
    );
};

export default Navbar;