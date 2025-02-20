import '../styles/User.css'; 
import { Posting } from '../components/Posting';
import { Link } from 'react-router-dom';
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
        </div>
    ); 
}

/**
 * A simple user page
 * @component
 * @returns {JSX.Element} The user page
*/
export function UserPage() {
    const pages = {
        PROFILE: 'Profile',
        POSTS: 'Posts', 
        WELCOME: 'Welcome',
        CREATE_POST: 'Create a Post'
    }; 

    const [loading, setLoading] = useState(true); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [page, setPage] = useState(pages.WELCOME); 
    const [userData, setUserData] = useState({}); 
    const [userPosts, setUserPosts] = useState([]); 
    

    const initPosts = async () => {
        if (!userData || !userData.id) return; // no user data
        const headers = {
            'Content-Type': 'application/json',
            'user_id': userData.id 
        }; 
        
        try {
            const response = await fetch ('/api/user/myPosts', 
                {headers: headers}
            ); 
            const result = await response.json(); 
            if (response.ok) {
                setUserPosts(result); 
            } else {
                setUserPosts([]); 
            }
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
                setLoading(false); 
            }
        }
        
        checkSession(); 
    }, [page]); 
    
    const signOutUser = async (event) => {
        event.preventDefault();
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error(error); 
        } else {
            setIsLoggedIn(false); 
        }
    }

    const UserSideBar = () => {
        return (
            <div className="user-side-bar"> 
                <button onClick={() => setPage(pages.PROFILE)}>{pages.PROFILE}</button>
                <button onClick={() => {
                        initPosts(); 
                        setPage(pages.POSTS);
                    }}>
                    {pages.POSTS}
                </button>
                <button onClick={() => {setPage(pages.CREATE_POST)}}>{pages.CREATE_POST}</button>
                <button className="sign-out-button" onClick={signOutUser}> Sign Out</button>
            </div>
        ); 
    }

    const renderPage = () => {
        if (loading) return (
            <div className="user-page">
                <p>Loading...</p>
            </div>
        ); 
        if (!isLoggedIn) {
            return (
                <div className="user-page">
                    <div className="user-content-block">
                        <p>You are not logged in.</p>
                        <p>Log in <Link to='/login' state={{nextPage: "/user"}}>here</Link></p>
                    </div>
                </div>
            ); 
        } 
        switch (page) {
            case pages.PROFILE:
                return (
                    <div className="user-page">
                        <UserSideBar></UserSideBar>
                        <div className="user-content-block">
                            <h1>Profile</h1>
                            <ProfilePage userData={userData}></ProfilePage>
                        </div>
                    </div>
                ); 
                case pages.POSTS:
                    return (
                        <div className="user-page">
                            <UserSideBar></UserSideBar>
                            <div className="user-content-block">
                                <h1>Posts</h1>
                                {userPosts.map((post, index) => <Posting postContent={post} key={index}></Posting>)}
                            </div>
                        </div>
                    ); 
                case pages.CREATE_POST: 
                return (
                    <div className="user-page">
                        <UserSideBar></UserSideBar>
                        <div className="user-content-block">
                            <PostCreator></PostCreator>
                        </div>
                    </div>
                ); 
                // welcome page
                default:
                    return (
                        <div className="user-page">
                            <UserSideBar></UserSideBar>
                            <div className="user-content-block">
                                <h1>Welcome! <br></br>Glad you want to salvage and sustain some items!</h1>
                            </div>
                        </div>
                    ); 
            }
        }
        
    return (renderPage()); 
        
}
