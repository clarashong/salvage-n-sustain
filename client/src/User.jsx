import './index.css';
import supabase from './data/supabaseClient' 
import { useState } from 'react';

/** A form to create a post
 * @component 
 * @returns {JSX.Element} the form 
 */
const PostCreator = () => {
    
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [items, setItems] = useState([]); 
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState(''); 
    const [errorMsg, setErrorMsg] = useState('');
    
    /** adds post form content into posts table in database
     * @returns {void}
     */
    const createPost = async () => {
        console.log('Creating post'); 
        const { data: { user }, error} = await supabase.auth.getUser(); 
        // there is no user logged into client
        console.log(user); 
        if (!user) {
            throw new Error("No active user session"); 
        }
        // supabase getUser operation has an error
        if (error) {
            throw new Error(error.message); 
        }
        let post = {
            title: title,
            user_id: user.id,
            user_name: user.user_metadata.name,
            description: description, 
            items: items
        };
        if (startDate) post.start_date = new Date (startDate + "T00:00:00"); 
        if (endDate) post.end_date = new Date (endDate + "T23:59:59"); 

        console.log(post); 
        const {insertData, insertError} = await supabase
            .from('posts')
            .insert([post]);
        if (insertError) {
            console.log(insertError); 
            throw new Error(insertError.message); 
        } 
    }
    
    /**
     * Attempt to sign up the user 
     * @returns {void} either returns an error message, or does nothing and submits the post
     */
    const validatePost = async (event) => {
        event.preventDefault(); 
        setErrorMsg(''); 
        try {
            if (title === '') throw new Error('Post must have a title'); 
            if (startDate.localeCompare(endDate) > 0) throw new Error ('End date must be at start date or later'); 
            await createPost(); 
        } catch (e) {
            setErrorMsg(e.message)
        }
        if (!errorMsg) setErrorMsg('Post Created!'); 
    }
    
    return (
        <div>
            <h1>Create a Posting</h1>
            <div className="inputBlock">
                <form onSubmit={validatePost}>
                    <p>Title</p>
                    <input 
                        type="text"
                        placeholder="Program Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>    
                    </input><br></br>
                    <p>Describe your program</p>
                    <input 
                        type="text"
                        placeholder=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >    
                    </input><br></br>
                    <p>What item are you accepting?</p>
                    <input 
                        type="text"
                        placeholder=""
                        value={items}
                        onChange={(e) => setItems([e.target.value])}
                    >    
                    </input><br></br>
                    <p>Start Date</p>
                    <input 
                        type="date"
                        placeholder=""
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    >    
                    </input><br></br>
                    <p>End Date</p>
                    <input 
                        type="date"
                        placeholder=""
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    >    
                    </input><br></br>
                    <button type="submit">Create Post</button>
                    <p className="errorMessage">{errorMsg}</p>
                </form>
            </div>
        </div>
    );
}


/**
 * A simple user page
 * @component
 * @returns {JSX.Element} The user page
 */
export function UserPage() {
    return <PostCreator></PostCreator>
}
