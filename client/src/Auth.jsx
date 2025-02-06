import './index.css';
import './Auth.css'
import supabase from './data/supabaseClient' 
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
    const loginUser = async (event) => {
        event.preventDefault();
        const { user, session, error } = await supabase.auth.signInWithPassword({
            email: email, 
            password: password
        }); 
        // TODO - delete after developed 
        console.log(user); 
        console.log(session); 
        console.log(error); 
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

/**
 * A simple sign up page 
 * @component 
 * @param {object} props 
 * @param {string} props.nextPage route to next page 
 * @returns 
 */
export function SignUpPage({nextPage}) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [confirmPass, setConfirmPass] = useState('');
    const [accountType, setAccountType] = useState(''); 
    const accountTypes = {
        ORGANIZATION: 'Organization', 
        PERSONAL: 'Personal'
    }; 
    
    /**
     * Attempt to sign up the user 
     * @returns {object|void} either returns an error message, or does nothing and redirects to next page 
     */
    const signUpUser = async (event) => {
        event.preventDefault(); 
        console.log("attempting to sign up"); 
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    accountType: accountType  
                }
            }
        });
        // TODO - delete after developed 
        console.log(data); 
        console.log(error); 
    };

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
                    {Object.entries(accountTypes).map(([key, value]) => <option key={value}>{value}</option>)}
                </select> <br></br>
                <input 
                    type="text"
                    placeholder= {((accountType === accountTypes.ORGANIZATION )? accountType : "Full") + " Name"}  
                    value={name}
                    onChange={(e) => setName(e.target.value)}>    
                </input><br></br>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    ); 
}