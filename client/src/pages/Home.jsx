import '../styles/Home.css';
import boxImage from '../assets/box.png'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

/**
 * a home page with a search bar that brings you to the posts page
 * @component
 * @returns {JSX.Element} Home/Landing page
 */
export function HomePage() {
    const [item, setItem] = useState(''); 
    const navigate = useNavigate(); 

    const search = () => {
        navigate('/posts', { state: {searchItem: item} }); 
    }; 

    const trackItem = (e) => {
        setItem(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") { 
            search(); 
        }
    }; 

    return (
        <div className="home-page">
            <h1>Welcome to Salvage 'N Sustain!</h1> 
            <h3> Hope you're ready to donate or properly dispose your items!</h3>
            <div className="block">
                <h2>What would you like to give away?</h2>
                <div className="box-block">
                    <input 
                        className="box-input" 
                        placeholder='Place your item here' 
                        value={item}
                        onKeyDown={handleEnter}
                        onChange={trackItem}>
                    </input>
                    <button 
                        className="box-button"
                        onClick={search}>
                        Search
                    </button>
                    <img className="box-image" alt="box image" src={boxImage}></img>
                </div>
            </div>
        </div>
    ); 
}