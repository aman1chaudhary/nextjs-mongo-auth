import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useUserContext } from '../contexts/UserContext'; // Import the context hook

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { loginUser, setLoginUser } = useUserContext(); // Access the context values
    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    const handleLogout = () => {
        setLoginUser({});
        localStorage.removeItem('user');
    };

    return (
        <div className="navbar-container">
            <div className="navbar__logo">
                {/* <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                    <img src={Logo} alt="" />
                </NavLink> */}
            </div>

            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`phone-nav ${showMenu ? 'show' : ''}`}>
                <div className="nav__content bd-grid">
                    <div className="nav__menu">
                        <ul>
                            <li className="nav__item">
                                <Link href="/" className="nav__link" onClick={handleLinkClick}>
                                    Home
                                </Link>
                            </li>

                            {loginUser && loginUser._id ? (
                                <>
                                    <li className="nav__item">
                                        <button className="nav__link login-btn" onClick={handleLogout}>
                                            Hey! {loginUser.name} (Logout)
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav__item">
                                        <Link href="/login" className="nav__link login-btn" onClick={handleLinkClick}>
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
