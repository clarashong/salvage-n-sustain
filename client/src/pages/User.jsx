import '../styles/index.css';
import { Posting } from '../components/Posting';
import { Link, useNavigate } from 'react-router-dom';
import { PostCreator } from '../components/PostCreator';
import supabase from '../data/supabaseClient' 
import { useState, useEffect } from 'react';

/**
 * 
 * @param {object} props 
 * @param {object} props.userData
 * @returns 
 */
const ProfilePage = ({userData}) => {
    console.log(userData); 
    if (!userData || !userData.user_metadata) return(<div></div>); // empty 

    const metadata = userData.user_metadata
    return (
        <div>
            <h3>Name</h3>
            <p>{metadata.name}</p>
            <h3>Email</h3>
            <p>{metadata.email}</p>
            <h3>Account Type</h3>
            <p>{metadata.accountType}</p>
            <h3>Location</h3>
            <h4>City</h4>
            <p>{}</p>
            <h4>State/Province</h4>
            <p>{}</p>
            <h4>Country</h4>
            <p>{}</p>
        </div>
    ); 
}

/**
 * A simple user page
 * @component
 * @returns {JSX.Element} The user page
*/
export function UserPage() {
    const [loading, setLoading] = useState(true); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [page, setPage] = useState(0); 
    const [userData, setUserData] = useState({}); 
    const [userSaved, setUserSaved] = useState([]);
    const [userPosts, setUserPosts] = useState([]); 
    const pages = {
        PROFILE: 'Profile',
        POSTS: 'Posts', 
        WELCOME: 'Welcome'
    }; 

    const initPosts = async () => {
        if (!userData || !userData.id) return; // no user data
        const headers = {
            'Content-Type': 'application/json',
            'user_id': userData.id 
        }; 
        
        try {
            const response = await fetch ('/user/myPosts', 
                {headers: headers}
            ); 
            const result = await response.json(); 
            setUserPosts(result); 
            console.log(result); 
        } catch (error) {
            console.log(error);
            throw(error);  
        }
    }; 

    // check if user is logged in at the beggining 
    useEffect(() => {
        const checkSession = async () => {
            let user = {}; 
            try {
                setLoading(true); 
                const { data, error} = await supabase.auth.getUser(); 
                user = data.user; 
                if (error) throw error; 
                // user is not logged in 
                if (!user) return; 
                
                setIsLoggedIn(true); // user is logged in
            } catch (e) {
                console.log(e.message); 
            } finally {
                setUserData(user); 
                setPage(pages.WELCOME); 
                setLoading(false); 
            }
        }
        
        checkSession(); 
    }, []); 
    
    const UserSideBar = () => {
        return (
            <div> 
                <button onClick={() => setPage(pages.PROFILE)}>{pages.PROFILE}</button>
                <button onClick={() => {
                        initPosts(); 
                        setPage(pages.POSTS);
                    }}>
                    {pages.POSTS}
                </button>
            </div>
        ); 
    }

    const renderPage = () => {
        if (loading) return (<p>Loading...</p>); 
        if (!isLoggedIn) {
            return (
                <div>
                    <p>You are not logged in</p>
                    <p>Log in <Link to='/login' state={{nextPage: "/user"}}>here</Link></p>
                </div>
            ); 
        } else if (page === pages.WELCOME) {
            return (
                <div>
                    <UserSideBar></UserSideBar>
                    <p>Welcome! Glad you want to salvage and sustain some items!</p>
                </div>
            ); 
        }else if (page === pages.PROFILE) {
            return (
                <div>
                    <UserSideBar></UserSideBar>
                    <h1>Profile</h1>
                    <ProfilePage userData={userData}></ProfilePage>
                </div>
            ); 
        } else if (page === pages.POSTS) {
            return (
                <div>
                    <UserSideBar></UserSideBar>
                    <h1>Posts</h1>
                    {userPosts.map((post, index) => <Posting postContent={post} key={index}></Posting>)}
                </div>
            ); 
        }
    }

    return renderPage();
}
