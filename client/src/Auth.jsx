import './index.css';
import './Auth.css'
import { supabase } from './App' 
import { useState, useEffect } from 'react';


/**
 * A simple login page with user email and password input. Leads 
 * @component
 * @param {object} props
 * @param {string} props.prevPage - the last page route accessed
 * @returns {JSX.Element} The login page
 */
export function LoginPage({nextPage}) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    /**
     * Attempt to login the user 
     * @returns {object|void} either returns the error message, or does nothing and redirects to next page 
     */
    const loginUser = () => {
        
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="inputBlock">
                <form onSubmit={loginUser}>
                    <input 
                        type="text"
                        placeholder="Email ex. email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>    
                    </input><br></br>
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >    
                    </input><br></br>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    ); 
}

export function SignUpPage() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [accountType, setAccountType] = useState(''); 
    const accountTypes = ["personal", "organization"]; 
    
    /**
     * Attempt to sign up the user 
     * @returns {object|void} either returns an error message, or does nothing and redirects to next page 
     */
    const signUpUser = () => {
        
    }

    return (
        <div> 
            <h1>Sign Up</h1>
            <div className="inputBlock"></div>
            <form onSubmit={signUpUser}>
                    <input 
                        type="text"
                        placeholder="Email ex. email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>    
                    </input><br></br>
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>    
                    </input><br></br>
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}>    
                    </input><br></br>
                    <select 
                        value={accountType} 
                        onChange={(e) => {setAccountType(e.target.value)}}>
                        <option>Select account type</option>
                        {accountTypes.map((type, index) => {
                            return (
                                <option key={index}>{type}</option>
                            ); 
                        })}
                    </select> <br></br>
                    <button type="submit">Sign Up</button>
                </form>
        </div>
    ); 
}