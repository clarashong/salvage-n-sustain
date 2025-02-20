import '../styles/index.css'; 
import '../styles/NavBar.css'; 
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/searchIcon.png';
import profileIcon from '../assets/profileIcon.png';

/**
 * Navigation bar with links to the different pages
 * @component
 * @returns {JSX.Element} The navigation bar
 */
export function NavBar() {
    return (
        <div className="navbar">
            <div className="navleft">
                <Link to="/">
                    <img 
                        className="logo"
                        src={logo}>
                    </img>
                </Link>
                <span className="navname">Salvage 'N' Sustain</span>
            </div>
            <ul className="navlist">
                <Link className="navitem" to="/posts">
                    <span className="link-title">Search Postings</span> 
                    <img className="icon" src={searchIcon}></img>
                </Link>
                <Link className="navitem" to="/user">
                    <span className="link-title">Profile</span>
                    <img className="icon" src={profileIcon}></img>
                </Link>
            </ul>   
        </div>
    ); 
} 